const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  const query = "Instalater";
  const city = "Pardubice";
  const url = `https://www.zivefirmy.cz/`;
  
  console.log("Navigating to:", url);
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  
  const searchInput = page.locator('input[name="q"], input[type="text"]').first();
  await searchInput.fill(query);
  
  const locInput = page.locator('input[name="loc"], input[type="text"]').nth(1);
  await locInput.fill(city);
  
  await page.keyboard.press('Enter');
  
  console.log("Waiting for navigation...");
  await page.waitForLoadState('networkidle');
  
  const currentUrl = page.url();
  console.log("URL after search:", currentUrl);
  
  const html = await page.content();
  fs.writeFileSync("zivefirmy_search.html", html);
  
  await browser.close();
})();
