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
      ? [
          "Instalatér", "Elektrikář", "Zedník", "Truhlář", "Pokrývač", 
          "Topenář", "Malíř pokojů", "Hodinový manžel", "Zámečník", 
          "Sádrokartonář", "Podlahář", "Automechanik", "Zemní práce", 
          "Rekonstrukce bytů", "Voda, plyn, topení"
        ] 
      : [category];

    const citiesToScrape = city === "Všechny"
      ? ["Pardubice", "Chrudim", "Svitavy", "Přelouč", "Holice"]
      : [city];

    let totalAddedCount = 0;

    const isDev = process.env.NODE_ENV === 'development';
    console.log(`[SCRAPER] Startuji Playwright v módu headless: ${!isDev}`);
    
    const browser = await chromium.launch({ headless: !isDev });
    const context = await browser.newContext({
      locale: 'cs-CZ',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });
    const page = await context.newPage();

    for (const currentCity of citiesToScrape) {
      for (const currentCategory of categoriesToScrape) {
        console.log(`\n======================================================`);
        console.log(`[SCRAPER] Zahajuji těžbu: ${currentCategory} v lokaci ${currentCity}`);
        console.log(`======================================================`);

        try {
          console.log(`[SCRAPER] Jdu na hlavní stránku zivefirmy.cz...`);
          await page.goto('https://www.zivefirmy.cz/', { waitUntil: 'domcontentloaded' });
          await page.waitForTimeout(Math.floor(Math.random() * 1500) + 1000);

          try {
            const acceptButton = page.locator('text="Souhlasím"');
            if (await acceptButton.count() > 0) {
              console.log(`[SCRAPER] Odklikávám Cookies okno...`);
              await acceptButton.first().click({ timeout: 2000 });
              await page.waitForTimeout(500);
            }
          } catch (e) {
             // Žádné cookies okno
          }

          console.log(`[SCRAPER] Vyplňuji obor: ${currentCategory}`);
          await page.locator('#select2-q-container').click();
          await page.waitForTimeout(500);
          await page.locator('input.select2-search__field').last().fill(currentCategory);
          await page.waitForTimeout(1000);
          await page.keyboard.press('Enter');

          console.log(`[SCRAPER] Vyplňuji město: ${currentCity}`);
          await page.locator('#select2-location-container').click();
          await page.waitForTimeout(500);
          await page.locator('input.select2-search__field').last().fill(currentCity);
          await page.waitForTimeout(1500); // Čekáme na AJAX načtení IDčka
          await page.keyboard.press('Enter');

          console.log(`[SCRAPER] Klikám na hledat a čekám na výsledky...`);
          await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => console.log('[SCRAPER] Navigation timeout (pokračuji)')),
            page.locator('button.btn-search').click()
          ]);
          
          console.log(`[SCRAPER] Jsem na URL výsledků: ${page.url()}`);
          await page.waitForTimeout(2000); // Jistota pro dorenderování DOMu

          // Pokus o nalezení elementů na stránce
          const hasAnyLinks = await page.locator('a[href*="_f"]').count();
          console.log(`[SCRAPER] Nalezeno surových _f odkazů na stránce: ${hasAnyLinks}`);

          console.log(`[SCRAPER] Filtruji firmy (vyřazuji ty s vlastním webem)...`);
          const detailUrls = await page.evaluate(() => {
            const results: string[] = [];
            
            // Zkusíme najít kontejnery pro firmy. Třídy mohou být různé.
            // Zkusíme najít nejprve nadřazené divy všech odkazů _f
            const profileLinks = Array.from(document.querySelectorAll('a[href*="_f"]')) as HTMLAnchorElement[];
            
            profileLinks.forEach(link => {
               // Zkusíme najít obal firmy (např. do 5 úrovní nahoru)
               let parent = link.parentElement;
               let isCompanyBlock = false;
               let iterations = 0;
               
               while (parent && iterations < 5) {
                 if (parent.className.includes('company') || parent.className.includes('firm') || parent.className.includes('item')) {
                    isCompanyBlock = true;
                    break;
                 }
                 parent = parent.parentElement;
                 iterations++;
               }

               // Pokud nenajdeme formální blok, bereme jako fallback přímo parentElement
               const blockToSearch = isCompanyBlock ? parent : link.parentElement?.parentElement;
               
               if (blockToSearch) {
                 // Hledáme v tomto bloku odkaz na externí web
                 const hasWeb = Array.from(blockToSearch.querySelectorAll('a')).some(a => {
                    const h = a.href || '';
                    return h.startsWith('http') && !h.includes('zivefirmy.cz') && !h.includes('facebook.com');
                 });
                 
                 if (!hasWeb) {
                   results.push(link.href);
                 }
               }
            });
            
            return Array.from(new Set(results)).slice(0, 15);
          });

          console.log(`[SCRAPER] Získáno finálních kandidátů (bez webu): ${detailUrls.length}`);

          if (detailUrls.length === 0) {
            console.log(`[SCRAPER] Žádné vhodné firmy nenalezeny, přeskakuji...`);
            continue;
          }

          let currentStep = 1;
          for (const url of detailUrls) {
            console.log(`\n[SCRAPER] Extrahuji firmu ${currentStep}/${detailUrls.length} -> ${url}`);
            currentStep++;

            try {
              await page.goto(url, { waitUntil: 'domcontentloaded' });
              await page.waitForTimeout(Math.floor(Math.random() * 2000) + 1000);

              const data = await page.evaluate(() => {
                const companyName = (document.querySelector('h1') as HTMLElement)?.innerText?.trim() || "";
                
                const emailEl = document.querySelector('a[href^="mailto:"]');
                let email = emailEl ? (emailEl as HTMLAnchorElement).href.replace('mailto:', '').trim() : null;
                
                if (!email) {
                  const emailMatch = document.body.innerText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
                  if (emailMatch) email = emailMatch[0].toLowerCase();
                }

                const phoneEl = document.querySelector('a[href^="tel:"]');
                let phone = phoneEl ? (phoneEl as HTMLAnchorElement).href.replace('tel:', '').trim() : null;
                
                if (!phone) {
                   const phoneMatch = document.body.innerText.match(/(?:\+420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}/);
                   if (phoneMatch) phone = phoneMatch[0].replace(/\s+/g, '');
                }

                const addressEl = document.querySelector('.address, [itemprop="address"], .contact-address');
                const address = (addressEl as HTMLElement)?.innerText?.trim() || "";

                return { companyName, email, phone, address };
              });

              if (!data.companyName) {
                console.log(`[SCRAPER] ❌ Přeskakuji. Nenašel jsem název firmy.`);
                continue;
              }
              if (!data.email || !data.phone) {
                console.log(`[SCRAPER] ❌ Přeskakuji. Chybí kontakt (telefon: ${!!data.phone}, email: ${!!data.email}).`);
                continue;
              }

              // Uložení do DB
              await prisma.lead.upsert({
                where: { phone: data.phone },
                update: {
                  companyName: data.companyName,
                  category: currentCategory,
                  city: currentCity,
                  userId: session.user.id,
                  address: data.address || undefined,
                  email: data.email,
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
              console.log(`[SCRAPER] ✅ Uloženo do DB: ${data.companyName} (${data.email})`);

            } catch (err) {
              console.log(`[SCRAPER] ❌ Padlo na chybě při extrakci detailu: ${(err as Error).message}`);
              console.log(`[SCRAPER] Pokračuji na další firmu...`);
            }
          }

        } catch (catErr) {
          console.error(`[SCRAPER] Kritická chyba v cyklu města/oboru:`, catErr);
        }
      }
    }

    console.log(`[SCRAPER] Zavírám Playwright. Uloženo celkem ${totalAddedCount} leadů.`);
    await browser.close();

    return NextResponse.json({ success: true, addedCount: totalAddedCount, message: `Scraping dokončen. Získáno ${totalAddedCount} kvalitních leadů.` });
  } catch (error: any) {
    console.error("[SCRAPER] Fatal Scrape Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
