import { test, expect } from "@playwright/test";

test("light/dark mode", async ({ page }) => {
  await page.goto("/");

  const locator = page.locator("html");
  await expect(locator).toHaveAttribute("data-theme", "dark");

  await page
    .getByRole("button", {
      name: "Switch between dark and light mode (currently dark mode)",
    })
    .click();

  await expect(locator).toHaveAttribute("data-theme", "light");
});
