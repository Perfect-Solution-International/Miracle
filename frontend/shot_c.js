const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  await page.goto('http://localhost:3000/travel-tourism', { waitUntil: 'networkidle' });
  const trigger = page.getByRole('button', { name: 'Travel & Tourism' });
  await trigger.hover();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'shot_megamenu3.png' });
  await browser.close();
})();
