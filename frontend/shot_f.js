const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1400 } });
  await page.goto('http://localhost:3000/travel-tourism', { waitUntil: 'networkidle' });
  const form = await page.locator('form[action*="travel-tourism"]').first();
  const box = await form.boundingBox();
  console.log('form box:', JSON.stringify(box));
  const heroSection = await page.locator('section').first();
  const heroBox = await heroSection.boundingBox();
  console.log('hero box:', JSON.stringify(heroBox));
  await page.screenshot({ path: 'shot_planner_area.png', clip: { x: 0, y: (heroBox.y+heroBox.height-100), width: 1440, height: 400 } });
  await browser.close();
})();
