import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login/loginPage";

test("login test", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  await page.locator('[data-test="nav-sign-in"]').click();
  // await page.locator('[data-test="email"]').click();
  await page
    .locator('[data-test="email"]')
    .fill("customer@practicesoftwaretesting.com");
  // await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("welcome01");
  await page.locator('[data-test="login-submit"]').click();
  await expect(page.locator('[data-test="nav-menu"]')).toContainText(
    "Jane Doe"
  );
  await page.locator('[data-test="page-title"]').click();
  await expect(page.locator('[data-test="page-title"]')).toContainText(
    "My account"
  );
});

test("login test with page object", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  // await loginPage.emailInput.fill("customer@practicesoftwaretesting.com");
  // await loginPage.passwordInput.fill("welcome01");
  // await loginPage.loginButton.click();
  await loginPage.login("customer@practicesoftwaretesting.com", "welcome01");
  await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
});
