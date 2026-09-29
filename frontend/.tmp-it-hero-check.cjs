const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const routes = [
    'website-development', 'software-development', 'pos-system-development',
    'business-management-systems', 'digital-solutions', 'it-consulting', 'business-automation',
  ];
  for (const width of [1440, 768, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    for (const route of routes) {
      const response = await page.goto(`http://localhost:3000/it-solutions/${route}`, { waitUntil: 'networkidle', timeout: 60000 });
      const result = await page.evaluate(() => {
        const hero = document.querySelector('section[aria-labelledby="it-detail-heading"]');
        const img = hero?.querySelector('img');
        const rect = hero?.getBoundingClientRect();
        return {
          h1: hero?.querySelector('h1')?.textContent?.trim(),
          highlights: hero?.querySelectorAll('ul[aria-label="Service highlights"] li').length,
          imageLoaded: !!img?.naturalWidth,
          imageSrc: img?.getAttribute('src')?.slice(0, 110),
          heroHeight: Math.round(rect?.height || 0),
          overflow: document.documentElement.scrollWidth > window.innerWidth,
          ctas: [...(hero?.querySelectorAll('a') || [])].map(a => ({ text: a.textContent.trim(), href: a.getAttribute('href') })),
          travelSearch: !!document.querySelector('input[placeholder*="Destination"], input[placeholder*="Travel Date"]'),
        };
      });
      console.log(JSON.stringify({ width, route, status: response.status(), ...result }));
      if ((width === 1440 && route === 'website-development') || (width === 768 && route === 'pos-system-development') || (width === 390 && route === 'business-management-systems')) {
        await page.locator('section[aria-labelledby="it-detail-heading"]').screenshot({ path: `.tmp-it-hero-${width}.png` });
      }
    }
    await page.close();
  }
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
