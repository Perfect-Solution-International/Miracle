const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();

  // Desktop: full travel-tourism page
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto('http://localhost:3000/travel-tourism', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'shot_desktop_full.png', fullPage: true });

  // Desktop: hover Travel & Tourism mega menu
  const navItem = page.getByRole('link', { name: 'Travel & Tourism' }).first();
  await navItem.hover();
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'shot_megamenu.png' });

  await browser.close();
})();
