import { NextResponse } from "next/server";
import { chromium } from "playwright";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// Vypnutí timeoutu na straně Vercelu
export const maxDuration = 300; 

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    const user = await prisma.user.findUnique({ where: { id: userId } });
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

    const encoder = new TextEncoder();
    
    // Vytvoříme ReadableStream
    const stream = new ReadableStream({
      async start(controller) {
        // Funkce pro odeslání logu do streamu a konzole
        const sendLog = (msg: string) => {
          console.log(msg);
          controller.enqueue(encoder.encode(msg + "\n"));
        };

        let browser;
        try {
          let totalAddedCount = 0;
          const isDev = process.env.NODE_ENV === 'development';
          sendLog(`[SCRAPER] Startuji Playwright v módu headless: ${!isDev}`);
          
          browser = await chromium.launch({ headless: !isDev });
          const context = await browser.newContext({
            locale: 'cs-CZ',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          });
          const page = await context.newPage();

          for (const currentCity of citiesToScrape) {
            for (const currentCategory of categoriesToScrape) {
              sendLog(`======================================================`);
              sendLog(`[SCRAPER] Zahajuji těžbu: ${currentCategory} v lokaci ${currentCity}`);
              sendLog(`======================================================`);

              try {
                sendLog(`[SCRAPER] Jdu na hlavní stránku zivefirmy.cz...`);
                await page.goto('https://www.zivefirmy.cz/', { waitUntil: 'domcontentloaded' });
                await page.waitForTimeout(Math.floor(Math.random() * 1500) + 1000);

                try {
                  const acceptButton = page.locator('text="Souhlasím"');
                  if (await acceptButton.count() > 0) {
                    sendLog(`[SCRAPER] Odklikávám Cookies okno...`);
                    await acceptButton.first().click({ timeout: 2000 });
                    await page.waitForTimeout(500);
                  }
                } catch (e) {
                   // Žádné cookies okno
                }

                sendLog(`[SCRAPER] Vyplňuji obor: ${currentCategory}`);
                await page.locator('#select2-q-container').click();
                await page.waitForTimeout(500);
                await page.locator('input.select2-search__field').last().fill(currentCategory);
                await page.waitForTimeout(1000);
                await page.keyboard.press('Enter');

                sendLog(`[SCRAPER] Vyplňuji město: ${currentCity}`);
                await page.locator('#select2-location-container').click();
                await page.waitForTimeout(500);
                await page.locator('input.select2-search__field').last().fill(currentCity);
                await page.waitForTimeout(1500); // Čekáme na AJAX načtení IDčka
                await page.keyboard.press('Enter');

                sendLog(`[SCRAPER] Klikám na hledat a čekám na výsledky...`);
                await Promise.all([
                  page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => sendLog('[SCRAPER] Navigation timeout (pokračuji)')),
                  page.locator('button.btn-search').click()
                ]);
                
                sendLog(`[SCRAPER] Jsem na URL výsledků: ${page.url()}`);
                await page.waitForTimeout(2000); // Jistota pro dorenderování DOMu

                // Pokus o nalezení elementů na stránce
                const hasAnyLinks = await page.locator('a[href*="_f"]').count();
                sendLog(`[SCRAPER] Nalezeno surových _f odkazů na stránce: ${hasAnyLinks}`);

                sendLog(`[SCRAPER] Filtruji firmy (vyřazuji ty s vlastním webem)...`);
                const detailUrls = await page.evaluate(() => {
                  const results: string[] = [];
                  const profileLinks = Array.from(document.querySelectorAll('a[href*="_f"]')) as HTMLAnchorElement[];
                  
                  profileLinks.forEach(link => {
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

                     const blockToSearch = isCompanyBlock ? parent : link.parentElement?.parentElement;
                     
                     if (blockToSearch) {
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

                sendLog(`[SCRAPER] Získáno finálních kandidátů (bez webu): ${detailUrls.length}`);

                if (detailUrls.length === 0) {
                  sendLog(`[SCRAPER] Žádné vhodné firmy nenalezeny, přeskakuji...`);
                  continue;
                }

                let currentStep = 1;
                for (const url of detailUrls) {
                  sendLog(`\n[SCRAPER] Extrahuji firmu ${currentStep}/${detailUrls.length} -> ${url}`);
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
                      sendLog(`[SCRAPER] ❌ Přeskakuji. Nenašel jsem název firmy.`);
                      continue;
                    }
                    if (!data.email || !data.phone) {
                      sendLog(`[SCRAPER] ❌ Přeskakuji. Chybí kontakt (telefon: ${!!data.phone}, email: ${!!data.email}).`);
                      continue;
                    }

                    // Uložení do DB
                    await prisma.lead.upsert({
                      where: { phone: data.phone },
                      update: {
                        companyName: data.companyName,
                        category: currentCategory,
                        city: currentCity,
                        userId: userId,
                        address: data.address || undefined,
                        email: data.email,
                      },
                      create: {
                        companyName: data.companyName,
                        phone: data.phone,
                        category: currentCategory,
                        city: currentCity,
                        userId: userId,
                        address: data.address || null,
                        email: data.email,
                      }
                    });

                    await prisma.user.update({
                      where: { id: userId },
                      data: { credits: { decrement: 1 } }
                    });
                    
                    totalAddedCount++;
                    sendLog(`[SCRAPER] ✅ Uloženo do DB: ${data.companyName} (${data.email})`);

                  } catch (err) {
                    sendLog(`[SCRAPER] ❌ Padlo na chybě při extrakci detailu: ${(err as Error).message}`);
                    sendLog(`[SCRAPER] Pokračuji na další firmu...`);
                  }
                }

              } catch (catErr) {
                sendLog(`[SCRAPER] ❌ Kritická chyba v cyklu města/oboru: ${(catErr as Error).message}`);
              }
            }
          }

          sendLog(`[SCRAPER] Zavírám Playwright. Uloženo celkem ${totalAddedCount} leadů.`);
        } catch (error: any) {
          sendLog(`[SCRAPER] ❌ Fatal Scrape Error: ${error.message}`);
        } finally {
          if (browser) await browser.close();
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    console.error("[SCRAPER] Fatal Route Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
