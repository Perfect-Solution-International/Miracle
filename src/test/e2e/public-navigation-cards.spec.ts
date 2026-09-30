import { expect, test } from "@playwright/test";

const cardGroups = [
  {
    page: "/business-solutions",
    section: "#solutions",
    titles: [
      "Start a Business",
      "Business Consultation",
      "Business Planning",
      "Business Setup Support",
      "Business Expansion",
      "Machinery & Equipment",
      "Business Technology",
      "Business Support",
    ],
  },
  {
    page: "/it-solutions",
    section: "#services",
    titles: [
      "Website Development",
      "Software Development",
      "POS System Development",
      "Business Management Systems",
      "Digital Solutions",
      "IT Consulting",
      "Business Automation",
    ],
  },
] as const;

for (const group of cardGroups) {
  test(`${group.page} cards have one destination and a full hit area`, async ({
    page,
  }) => {
    test.setTimeout(60_000);
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    await page.goto(group.page);
    const cards = page.locator(`${group.section} ul > li`);
    await expect(cards).toHaveCount(group.titles.length);

    for (const title of group.titles) {
      const card = cards.filter({
        has: page.getByRole("link", { name: `Learn more about ${title}` }),
      });
      await expect(card).toHaveCount(1);
      await expect(card.locator("a")).toHaveCount(1);
      await expect(card.getByText("Learn More")).toBeVisible();
      await expect(card.getByRole("link")).toHaveAttribute("href", /\/.+/);
      const destination = await card.getByRole("link").getAttribute("href");
      await card.scrollIntoViewIfNeeded();
      const cardBox = await card.boundingBox();
      expect(cardBox).toBeTruthy();
      await page.mouse.click(
        cardBox!.x + cardBox!.width - 8,
        cardBox!.y + cardBox!.height - 8,
      );
      await expect(page).toHaveURL(new RegExp(`${destination}$`));
      await page.goto(group.page);
    }

    const card = cards.first();
    const href = await card.getByRole("link").getAttribute("href");
    expect(href).toBeTruthy();

    for (const target of ["img", "svg", "h3", "p", "span:has-text('Learn More')"]) {
      const element = card.locator(target).first();
      await element.scrollIntoViewIfNeeded();
      const targetBox = await element.boundingBox();
      expect(targetBox).toBeTruthy();
      await page.mouse.click(
        targetBox!.x + targetBox!.width / 2,
        targetBox!.y + targetBox!.height / 2,
      );
      await expect(page).toHaveURL(new RegExp(`${href}$`));
      await page.goto(group.page);
    }

    await card.scrollIntoViewIfNeeded();
    const box = await card.boundingBox();
    expect(box).toBeTruthy();
    await page.mouse.click(box!.x + box!.width - 8, box!.y + box!.height - 8);
    await expect(page).toHaveURL(new RegExp(`${href}$`));

    await page.goto(group.page);
    const link = cards.first().getByRole("link");
    await link.focus();
    await expect(link).toBeFocused();
    await expect(cards.first()).toHaveCSS("cursor", "pointer");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    expect(pageErrors).toEqual([]);
  });
}

test("homepage pillar card opens from its description", async ({ page }) => {
  await page.goto("/");
  const link = page.getByRole("link", { name: "Explore Business Solutions" });
  const card = link.locator("xpath=../..");
  await expect(card.locator("a")).toHaveCount(1);
  const description = card.getByText(
    "Comprehensive advisory and operational support to turn ideas into structured, high-performing enterprises.",
  );
  await description.scrollIntoViewIfNeeded();
  const box = await description.boundingBox();
  expect(box).toBeTruthy();
  await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2);
  await expect(page).toHaveURL(/\/business-solutions$/);
});
