const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto('http://localhost:3000/travel-tourism', { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  const form = page.locator('form[action*="travel-tourism"]').first();
  await form.screenshot({ path: 'shot_form_element.png' });
  await browser.close();
})();
