import { test, expect } from "@playwright/test";

test.describe("Home page with no auth", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("visual test", async ({ page }) => {
    await expect(page).toHaveScreenshot(
      "tests/home.spec.ts-snapshots/home-page-no-auth-chromium-linux.png"
    );
  });

  test("check sign in", async ({ page }) => {
    // ensure the sign-in link s present
    await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
  });

  test("validate page title", async ({ page }) => {
    // chack the title of the page
    await expect(page).toHaveTitle(
      "Practice Software Testing - Toolshop - v5.0"
    );
  });

  test("grid loads with 9 items", async ({ page }) => {
    // check the count of items displayed
    const productGrid = page.locator(".col-md-9");
    await expect(productGrid.getByRole("link")).toHaveCount(9);
    expect(await productGrid.getByRole("link").count()).toBe(9);
  });

  test("search for thor hammer", async ({ page }) => {
    // search for thor hammer and check the result
    const productGrid = page.locator(".col-md-9");
    await page.getByTestId("search-query").fill("Thor Hammer");
    await page.getByTestId("search-submit").click();
    await expect(productGrid.getByRole("link")).toHaveCount(1);
    await expect(page.getByAltText("Thor Hammer")).toBeVisible();
  });

  test.describe("Home page customer 01 auth", () => {
    test.use({ storageState: ".auth/customer01.json" });
    test.beforeEach(async ({ page }) => {
      await page.goto("https//practicesoftwaretesting.com/");
    });

    test("visual test authorized", async ({ page }) => {
      await expect(page).toHaveScreenshot(
        "home-page-customer01-chromium-linux.png"
      );
    });
    //╰─ npx playwright test tests/home.spec.ts --update-snapshots

    test("check customer 01 is signed in", async ({ page }) => {
      await expect(page.getByTestId("nav-sign-in")).not.toBeVisible();
    });
  });
});

// npx playwright test tests/home.spec.ts
