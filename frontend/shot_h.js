const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto('http://localhost:3000/travel-tourism', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'shot_planner_clean.png', clip: { x: 0, y: 500, width: 1440, height: 250 } });
  const label = page.locator('label', { hasText: 'From' }).first();
  const box = await label.boundingBox();
  console.log('label box', JSON.stringify(box));
  const span = page.locator('label span', { hasText: 'From' }).first();
  console.log('span text', await span.textContent());
  console.log('span box', JSON.stringify(await span.boundingBox()));
  await browser.close();
})();
