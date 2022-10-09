import { test, expect } from "@playwright/test";

test("blog post title", async ({ page }) => {
  await page.goto("/");

  const blogLink = page.locator("article h2 a").first();
  const title = await blogLink.innerText();

  await blogLink.click();

  await expect(page).toHaveTitle(title); // Should not contain site title suffix
  await expect(page.locator("h1")).toHaveText(title);
});
