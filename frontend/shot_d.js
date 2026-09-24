const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();

  // Mobile drawer
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto('http://localhost:3000/travel-tourism', { waitUntil: 'networkidle' });
  await mobile.getByRole('button', { name: 'Open navigation menu' }).click();
  await mobile.waitForTimeout(300);
  await mobile.screenshot({ path: 'shot_mobile_nav.png' });

  // expand Travel & Tourism section in drawer
  const details = mobile.locator('summary', { hasText: 'Travel & Tourism' });
  await details.click();
  await mobile.waitForTimeout(200);
  await mobile.screenshot({ path: 'shot_mobile_nav_expanded.png' });

  await browser.close();
})();
