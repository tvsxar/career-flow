import { test, expect } from "@playwright/test";

test("app opens successfully", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveURL("http://localhost:5174/");
  await expect(
    page.getByRole("heading", { name: /Track your job search/i }),
  ).toBeVisible();
});

test("user can create an account", async ({ page }) => {
  const uniqueId = Date.now();

  const username = `e2euser${uniqueId}`;
  const email = `e2e${uniqueId}@gmail.com`;
  const password = "TestPassword123!";

  await page.goto("/register");

  await page.getByLabel("Username").fill(username);
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);

  await page.getByRole("button", { name: "Sign up" }).click();

  await expect(page).toHaveURL(/\/dashboard$/);

  await expect(
    page.getByRole("heading", { name: "Your applications" }),
  ).toBeVisible();
});
