import { test, expect, type Page } from "@playwright/test";

async function registerUser(page: Page) {
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
}

async function createJob(page: Page) {
  await page.getByRole("button", { name: "+ Add job", exact: true }).click();

  const modalHeading = page.getByRole("heading", { name: "Add new job" });

  await expect(modalHeading).toBeVisible();

  await page.getByLabel("Company").fill("Amazon");
  await page.getByLabel("Position").fill("Software Engineer");
  await page.getByLabel("Location").fill("Berlin");
  await page.getByLabel("Salary").fill("3000");

  await page.getByRole("button", { name: "Add job", exact: true }).click();

  const jobHeading = page.getByRole("heading", { name: "Software Engineer" });

  await expect(jobHeading).toBeVisible();
}

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

test("user can sign in", async ({ page }) => {
  const uniqueId = Date.now();

  const username = `loginuser${uniqueId}`;
  const email = `login${uniqueId}@gmail.com`;
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

  await page.getByRole("button", { name: "Sign out" }).click();

  await expect(page).toHaveURL("/");

  await page.getByLabel("Username or email").fill(username);
  await page.getByLabel("Password").fill(password);

  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(
    page.getByRole("heading", { name: "Your applications" }),
  ).toBeVisible();
});

test("user can create a job", async ({ page }) => {
  await registerUser(page);

  await createJob(page);
});

test("user can update job status", async ({ page }) => {
  await registerUser(page);

  await createJob(page);

  await page.getByRole("combobox").selectOption("interview");

  await expect(page.getByRole("combobox")).toHaveValue("interview");
});

test("user can delete a job", async ({ page }) => {
  await registerUser(page);

  await createJob(page);

  await page.getByRole("button", { name: "Delete" }).click();

  const jobHeading = page.getByRole("heading", { name: "Software Engineer" });

  await expect(jobHeading).toHaveCount(0);
});
