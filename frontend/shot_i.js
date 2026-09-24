const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto('http://localhost:3000/travel-tourism', { waitUntil: 'networkidle' });
  const span = page.locator('label span', { hasText: 'From' }).first();
  const style = await span.evaluate(el => {
    const cs = getComputedStyle(el);
    return { color: cs.color, fontSize: cs.fontSize, visibility: cs.visibility, opacity: cs.opacity, zIndex: cs.zIndex, position: cs.position, display: cs.display };
  });
  console.log(JSON.stringify(style, null, 2));
  const label = page.locator('label', { hasText: 'From' }).first();
  const labelStyle = await label.evaluate(el => {
    const cs = getComputedStyle(el);
    return { display: cs.display, flexDirection: cs.flexDirection, overflow: cs.overflow, height: cs.height };
  });
  console.log('label style', JSON.stringify(labelStyle, null, 2));
  await browser.close();
})();
