import { test, expect } from "@playwright/test";

test("email address validation", async ({ page }) => {
  await page.goto("/");

  const input = page.locator("#form_field_email");
  await input.fill("invalid@example");
  await input.press("Enter");
  await expect(page.getByText('"Email" must be a valid email')).toBeVisible();
});
