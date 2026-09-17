const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://www.zivefirmy.cz/', { waitUntil: 'domcontentloaded' });
  
  try {
    const acceptButton = page.locator('text="Souhlasím"');
    if (await acceptButton.count() > 0) {
      await acceptButton.first().click({ timeout: 2000 });
      await page.waitForTimeout(500);
    }
  } catch (e) {}

  console.log("Filling category...");
  await page.locator('#select2-q-container').click();
  await page.waitForTimeout(500);
  await page.locator('input.select2-search__field').last().fill('Instalatér');
  await page.waitForTimeout(1000);
  await page.keyboard.press('Enter');

  console.log("Filling location...");
  await page.locator('#select2-location-container').click();
  await page.waitForTimeout(500);
  await page.locator('input.select2-search__field').last().fill('Pardubice');
  await page.waitForTimeout(1500); // wait for ajax
  await page.keyboard.press('Enter');

  console.log("Submitting...");
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    page.locator('button.btn-search').click()
  ]);

  console.log("Result URL:", page.url());
  const html = await page.content();
  const found = html.includes('Instalater') || html.includes('company-item');
  console.log("Found companies:", found);
  
  await browser.close();
})();
