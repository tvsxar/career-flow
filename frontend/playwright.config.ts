import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",

  globalSetup: "./e2e/globalSetup.ts",

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  reporter: "html",

  use: {
    baseURL: "http://localhost:5174",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: [
    {
      command: "npm run dev:e2e",
      url: "http://localhost:5174",
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "npm run dev:e2e",
      cwd: "../backend",
      url: "http://localhost:1100/api/health",
      reuseExistingServer: !process.env.CI,
    },
  ],
});
