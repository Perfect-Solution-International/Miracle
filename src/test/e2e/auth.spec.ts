import { expect, test } from "@playwright/test";

/**
 * Guards the authorisation boundary end to end. These assertions must hold
 * regardless of how the UI is refactored.
 */
test.describe("authentication boundary", () => {
  test("redirects an anonymous visitor from a portal route to login", async ({
    page,
  }) => {
    await page.goto("/customer/dashboard");

    await expect(page).toHaveURL(/\/login/);
    // The intended destination is preserved so login can return the user to it.
    expect(page.url()).toContain("redirectTo");
  });

  test("protects every portal root", async ({ page }) => {
    for (const path of ["/customer", "/supplier", "/staff", "/admin"]) {
      await page.goto(`${path}/dashboard`);
      await expect(page).toHaveURL(/\/login/);
    }
  });

  test("serves the public marketing pages to guests", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("shows validation errors rather than submitting an empty form", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: /sign in/i }).click();

    await expect(page.getByText(/email is required|valid email/i).first()).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });

  test("exposes a skip link for keyboard users", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");

    await expect(page.getByRole("link", { name: /skip to main content/i })).toBeFocused();
  });
});
