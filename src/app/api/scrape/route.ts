import { NextResponse } from "next/server";
import { chromium } from "playwright";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { fetchAresData } from "@/lib/ares";

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

    // Launch Playwright (must have run `npx playwright install` locally)
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      locale: 'cs-CZ',
      geolocation: { longitude: 15.77, latitude: 50.04 }, // Pardubice region approx
      permissions: ['geolocation']
    });
    const page = await context.newPage();

    for (const currentCity of citiesToScrape) {
      for (const currentCategory of categoriesToScrape) {
        console.log(`Zahajuji těžbu: ${currentCategory} v ${currentCity}`);

        const query = `${currentCategory} ${currentCity}`;
        await page.goto(`https://www.google.com/maps/search/${encodeURIComponent(query)}`);

        // Přijetí cookies pokud vyskočí
        try {
          const acceptButton = page.locator('button:has-text("Přijmout vše")');
          if (await acceptButton.count() > 0) {
            await acceptButton.first().click({ timeout: 2000 });
          }
        } catch (e) {
          // Ignorovat, pokud se neobjeví
        }

        // Počkat na načtení výsledků
        await page.waitForTimeout(3000);

        // Najdeme feed s výsledky a posuneme dolů pro načtení více dat
        const feed = page.locator('div[role="feed"]');
        if (await feed.isVisible()) {
          await feed.hover();
          await page.mouse.wheel(0, 10000);
          await page.waitForTimeout(2000);
        }

        // Najít všechny odkazy na firmy v seznamu
        const elements = page.locator('a[href*="/maps/place/"]');
        const links = await elements.evaluateAll((els) => els.map((el) => (el as HTMLAnchorElement).href));
        
        // Zpracování jen prvních 10 odkazů na každou kombinaci, aby API nespadlo
        const linksToProcess = Array.from(new Set(links)).slice(0, 10);
        
        for (const link of linksToProcess) {
          await page.goto(link);
          await page.waitForTimeout(1000);

          try {
            // Zjistíme, jestli má firma webové stránky
            const websiteLink = page.locator('a[data-item-id="authority"]');
            const hasWebsite = await websiteLink.count() > 0;

            // Pokud web MÁ, ignorujeme
            if (hasWebsite) {
              continue;
            }

            // Zjistíme telefon (v Google Maps začínají href obvykle s "tel:")
            const phoneLocator = page.locator('button[data-item-id^="phone:tel:"]');
            if (await phoneLocator.count() > 0) {
              let phoneAttr = await phoneLocator.first().getAttribute('data-item-id');
              const phone = phoneAttr?.replace('phone:tel:', '').trim();
              
              const titleLocator = page.locator('h1');
              const companyName = await titleLocator.first().innerText();

              if (phone && companyName) {
                // Zkusíme najít e-mail pomocí DuckDuckGo
                let foundEmail: string | null = null;
                try {
                  const ddgPage = await context.newPage();
                  const searchQuery = `${companyName} ${currentCity} e-mail`;
                  await ddgPage.goto(`https://duckduckgo.com/html/?q=${encodeURIComponent(searchQuery)}`, { waitUntil: 'domcontentloaded', timeout: 10000 });
                  
                  const pageText = await ddgPage.evaluate(() => document.body.innerText);
                  await ddgPage.close();

                  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
                  const matches = pageText.match(emailRegex);
                  
                  if (matches && matches.length > 0) {
                    const blacklistedDomains = ['firmy.cz', 'najisto.cz', 'epoptavka.cz', 'aaapoptavka.cz', 'zive.cz', 'heureka.cz', 'bazos.cz', 'sbazar.cz', 'duckduckgo.com'];
                    
                    // Najít první email, jehož doména není na blacklistu
                    for (const email of matches) {
                      const domain = email.split('@')[1].toLowerCase();
                      if (!blacklistedDomains.includes(domain)) {
                        foundEmail = email.toLowerCase();
                        break; // Našli jsme relevantní
                      }
                    }
                  }
                } catch (e) {
                  console.error(`Chyba při hledání e-mailu pro ${companyName}:`, e);
                }

                // Uložení do databáze (s ohledem na userId)
                try {
                  const aresData = await fetchAresData(companyName);
                  await prisma.lead.upsert({
                    where: { phone },
                    update: {
                      companyName,
                      category: currentCategory,
                      city: currentCity,
                      userId: session.user.id,
                      ico: aresData?.ico || undefined,
                      address: aresData?.address || undefined,
                      ...(foundEmail && { email: foundEmail }),
                    },
                    create: {
                      companyName,
                      phone,
                      category: currentCategory,
                      city: currentCity,
                      userId: session.user.id,
                      ico: aresData?.ico || null,
                      address: aresData?.address || null,
                      email: foundEmail || null,
                    }
                  });

                  await prisma.user.update({
                    where: { id: session.user.id },
                    data: { credits: { decrement: 1 } }
                  });
                  totalAddedCount++;
                } catch (error) {
                  console.error(`Chyba zápisu pro [${companyName}]:`, error);
                }
              }
            }
          } catch (err) {
            console.error("Chyba při scrapování detailu:", err);
          }
        }
      }
    }

    await browser.close();

    return NextResponse.json({ success: true, addedCount: totalAddedCount, message: `Scraping dokončen. Získáno ${totalAddedCount} leadů.` });
  } catch (error: any) {
    console.error("Scrape Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
