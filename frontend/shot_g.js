const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/travel-tourism', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'shot_hero_planner_full.png', clip: { x: 0, y: 0, width: 1440, height: 750 } });
  await browser.close();
})();
