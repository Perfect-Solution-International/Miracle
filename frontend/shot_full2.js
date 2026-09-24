const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto('http://localhost:3000/travel-tourism', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'shot_full_v2.png', fullPage: true });
  await browser.close();
})();
