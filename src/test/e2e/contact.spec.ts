import { expect, test, type Page } from "@playwright/test";

// Exercise the built page with intercepted email responses; no live SMTP.
async function fillContact(page: Page) {
  await page.goto("/contact");
  await page.getByLabel(/your name/i).fill("Browser Test Visitor");
  await page.getByLabel(/email address/i).fill("visitor@example.com");
  await page.getByLabel(/phone number/i).fill("+94 77 123 4567");
  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "General Inquiry" }).click();
  await page
    .getByLabel(/your message/i)
    .fill("Please send more information about your services.");
}

test("validates required fields and malformed email", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send Message", exact: true }).click();
  await expect(page.getByText("Enter your name.", { exact: true })).toBeVisible();
  await page.getByLabel(/email address/i).fill("invalid");
  await page.getByRole("button", { name: "Send Message", exact: true }).click();
  await expect(
    page.getByText("Enter a valid email address.", { exact: true }),
  ).toBeVisible();
});

test("waits for backend acceptance, prevents duplicate sends and clears the form", async ({
  page,
}) => {
  let requests = 0;
  let accept!: () => void;
  const gate = new Promise<void>((resolve) => {
    accept = resolve;
  });
  await page.route("**/api/v1/contact", async (route) => {
    if (route.request().method() === "OPTIONS")
      return route.fulfill({
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "POST",
        },
      });
    requests++;
    await gate;
    await route.fulfill({
      json: { success: true },
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  });
  await fillContact(page);
  await page.getByRole("button", { name: "Send Message", exact: true }).dblclick();
  await expect(
    page.getByRole("button", { name: "Sending...", exact: true }),
  ).toBeDisabled();
  await expect(page.getByLabel(/your name/i)).toHaveValue("Browser Test Visitor");
  await expect.poll(() => requests).toBe(1);
  accept();
  await expect(page.locator("#contact-form").getByRole("status")).toContainText(
    "accepted by our email service",
  );
  await expect(page.getByLabel(/your name/i)).toHaveValue("");
});

test("retains entered values when the network fails", async ({ page }) => {
  await page.route("**/api/v1/contact", (route) => route.abort("failed"));
  await fillContact(page);
  await page.getByRole("button", { name: "Send Message", exact: true }).click();
  await expect(page.locator("#contact-form").getByRole("alert")).toContainText(
    "could not confirm",
  );
  await expect(page.getByLabel(/your name/i)).toHaveValue("Browser Test Visitor");
  await expect(
    page.getByRole("button", { name: "Send Message", exact: true }),
  ).toBeEnabled();
});

for (const width of [320, 768, 1280]) {
  test(`form and feedback fit a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send Message", exact: true }).click();
    const overflow = await page
      .locator("#contact-form")
      .evaluate((element) => element.scrollWidth > element.clientWidth);
    expect(overflow).toBe(false);
    const box = await page.locator("#contact-form").boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(width);
  });
}
