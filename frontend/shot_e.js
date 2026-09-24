const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1400 } });
  await page.goto('http://localhost:3000/travel-tourism', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'shot_hero_zoom.png', clip: { x: 0, y: 400, width: 1440, height: 700 } });
  const html = await page.content();
  require('fs').writeFileSync('page_dump.html', html);
  await browser.close();
})();
