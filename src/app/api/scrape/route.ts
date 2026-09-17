import { NextResponse } from "next/server";
import { chromium } from "playwright";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user || user.credits <= 0) {
      return NextResponse.json({ success: false, error: "Insufficient credits" }, { status: 403 });
    }

    const { city, category } = await req.json();

    if (!city || !category) {
      return NextResponse.json({ success: false, error: "Missing city or category" }, { status: 400 });
    }

    const categoriesToScrape = category === "Všechny" 
      ? ["Instalatér", "Elektrikář", "Truhlář", "Zedník", "Pokrývač"] 
      : [category];

    const citiesToScrape = city === "Všechny"
      ? ["Pardubice", "Chrudim", "Svitavy", "Přelouč", "Holice"]
      : [city];

    let totalAddedCount = 0;

    // Lokálně chceme reálný prohlížeč (headless: false), aby nás zivefirmy neblokovaly hned,
    // v produkci necháme headless: true, ale jak domluveno, uživatel to bude pouštět primárně lokálně.
    const isDev = process.env.NODE_ENV === 'development';
    const browser = await chromium.launch({ headless: !isDev });
    
    const context = await browser.newContext({
      locale: 'cs-CZ',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });
    const page = await context.newPage();

    for (const currentCity of citiesToScrape) {
      for (const currentCategory of categoriesToScrape) {
        console.log(`Zahajuji těžbu na zivefirmy.cz: ${currentCategory} v ${currentCity}`);

        const url = `https://www.zivefirmy.cz/vyhledavani?q=${encodeURIComponent(currentCategory)}&loc=${encodeURIComponent(currentCity)}`;
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        
        // Náhodná pauza pro simulaci lidského chování (1-3 sekundy)
        await page.waitForTimeout(Math.floor(Math.random() * 2000) + 1000);

        try {
          const acceptButton = page.locator('text="Souhlasím"');
          if (await acceptButton.count() > 0) {
            await acceptButton.first().click({ timeout: 2000 });
            await page.waitForTimeout(1000);
          }
        } catch (e) {
          // Ignorovat
        }

        // Získání odkazů na firmy
        const links = await page.evaluate(() => {
          const results: string[] = [];
          
          // Zkusíme najít bloky firem (obvykle .company-item, .firm)
          const blocks = document.querySelectorAll('div.company-item, div.company, li.company, div.firm');
          
          if (blocks.length > 0) {
            blocks.forEach(block => {
              // Hledáme odkaz na webovou stránku firmy
              const hasWeb = Array.from(block.querySelectorAll('a')).some(a => {
                const h = a.href || '';
                return h.startsWith('http') && !h.includes('zivefirmy.cz') && !h.includes('facebook.com');
              });
              
              // Pokud firma nemá web, najdeme její detail
              if (!hasWeb) {
                const detailLink = block.querySelector('a[href*="_f"]');
                if (detailLink && (detailLink as HTMLAnchorElement).href) {
                  results.push((detailLink as HTMLAnchorElement).href);
                }
              }
            });
          } else {
            // Bezpečný fallback, pokud by změnili CSS třídy
            // Najdeme všechny odkazy na profil a vyfiltrujeme je trochu nahrubo
            const allProfileLinks = Array.from(document.querySelectorAll('a[href*="_f"]')).map(a => (a as HTMLAnchorElement).href);
            return Array.from(new Set(allProfileLinks)).slice(0, 15);
          }
          
          return Array.from(new Set(results)).slice(0, 15);
        });

        console.log(`Nalezeno ${links.length} potenciálních firem bez webu v ${currentCity}.`);

        for (const link of links) {
          console.log(`Zpracovávám profil: ${link}`);
          await page.goto(link, { waitUntil: 'domcontentloaded' });
          
          // Zpoždění jako prevence bloku
          await page.waitForTimeout(Math.floor(Math.random() * 2000) + 1500);

          try {
            const data = await page.evaluate(() => {
              const companyName = document.querySelector('h1')?.innerText?.trim() || "";
              
              // E-mail (často v odkazu mailto:)
              const emailEl = document.querySelector('a[href^="mailto:"]');
              let email = emailEl ? (emailEl as HTMLAnchorElement).href.replace('mailto:', '').trim() : null;
              
              // Fallback pro e-mail textově
              if (!email) {
                const emailMatch = document.body.innerText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
                if (emailMatch) email = emailMatch[0].toLowerCase();
              }

              // Telefon (často v odkazu tel:)
              const phoneEl = document.querySelector('a[href^="tel:"]');
              let phone = phoneEl ? (phoneEl as HTMLAnchorElement).href.replace('tel:', '').trim() : null;
              
              if (!phone) {
                 const phoneMatch = document.body.innerText.match(/(?:\+420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}/);
                 if (phoneMatch) phone = phoneMatch[0].replace(/\s+/g, '');
              }

              // Město se většinou nachází v adrese, zkusíme najít aspoň ulici
              const address = document.querySelector('.address, [itemprop="address"], .contact-address')?.innerText?.trim() || "";

              // Ještě jednou ověříme, že tu není odkaz na web
              const webLinks = Array.from(document.querySelectorAll('a')).map(a => a.href).filter(h => h.startsWith('http') && !h.includes('zivefirmy.cz'));
              const hasWeb = webLinks.length > 0;

              return { companyName, email, phone, address, hasWeb };
            });

            // Přísný filtr: Zajímá nás jen firma, která nemá web a má e-mail!
            if (!data.hasWeb && data.companyName && data.phone && data.email) {
              try {
                await prisma.lead.upsert({
                  where: { phone: data.phone },
                  update: {
                    companyName: data.companyName,
                    category: currentCategory,
                    city: currentCity,
                    userId: session.user.id,
                    address: data.address || undefined,
                    email: data.email, // Máme jistotu e-mailu
                  },
                  create: {
                    companyName: data.companyName,
                    phone: data.phone,
                    category: currentCategory,
                    city: currentCity,
                    userId: session.user.id,
                    address: data.address || null,
                    email: data.email,
                  }
                });

                await prisma.user.update({
                  where: { id: session.user.id },
                  data: { credits: { decrement: 1 } }
                });
                totalAddedCount++;
                console.log(`✅ Úspěšně uloženo: ${data.companyName} (${data.email})`);
              } catch (error) {
                console.error(`Chyba zápisu pro [${data.companyName}]:`, error);
              }
            } else {
               console.log(`❌ Přeskočeno (Chybí e-mail nebo má web): ${data.companyName}`);
            }
          } catch (err) {
            console.error("Chyba při scrapování detailu:", err);
          }
        }
      }
    }

    await browser.close();

    return NextResponse.json({ success: true, addedCount: totalAddedCount, message: `Scraping zivefirmy.cz dokončen. Získáno ${totalAddedCount} kvalitních leadů s e-mailem.` });
  } catch (error: any) {
    console.error("Scrape Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
