const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  await page.goto('http://localhost:3000/travel-tourism', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, 0));
  const navItem = page.getByRole('link', { name: 'Travel & Tourism' }).first();
  await navItem.hover();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'shot_megamenu2.png' });
  await browser.close();
})();
