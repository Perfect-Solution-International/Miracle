const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto('http://localhost:3000/travel-tourism', { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  const info = await page.evaluate(() => {
    const x = 200, y = 590; // near the "From" label
    const el = document.elementFromPoint(x, y);
    return {
      tag: el.tagName,
      class: el.className,
      text: el.textContent?.slice(0, 40),
      rect: el.getBoundingClientRect(),
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
