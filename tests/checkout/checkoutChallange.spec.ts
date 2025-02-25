import { test, expect } from "@playwright/test";

test.describe("Check out", async () => {
  test.use({ storageState: ".auth/customer01.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("buy now pay later", async ({ page, headless }) => {
    await page.getByText("Claw Hammer with Shock Reduction Grip").click();
    await page.getByText("Add to cart").click();
    await expect(page.getByTestId("cart-quantity")).toHaveText("1");
    await page.getByTestId("nav-cart").click();
    await page.getByTestId("proceed-1").click();
    await page.getByTestId("proceed-2").click();
    await expect(
      page.locator(".step-indicator").filter({ hasText: "2" })
    ).toHaveCSS("background-color", "rgb(51, 153, 51");
    await page.getByTestId("address").clear();
    await page.getByTestId("address").fill("123 Testing Avenue");
    await page.getByTestId("city").clear();
    await page.getByTestId("city").fill("Torrelodones");
    await page.getByTestId("state").clear();
    await page.getByTestId("state").fill("Madrid");
    await page.getByTestId("country").clear();
    await page.getByTestId("country").fill("Spain");
    await page.getByTestId("postal_code").clear();
    await page.getByTestId("postal_code").fill("123456");
    await page.getByTestId("proceed-3").click();
    await page.getByTestId("payment-method").click();
    await page.getByTestId("payment-method").selectOption("Credit Card");
    await page.getByTestId("credit_card_number").fill("0000-0000-0000-0000");
    await page.getByTestId("expiration_date").fill("10/2025");
    await page.getByTestId("cvv").fill("123");
    await page.getByTestId("card_holder_name").fill("JANE DOE");
    await page.getByTestId("finish").click();
    await expect(page.getByTestId("payment-success-message")).toHaveText(
      "Payment was successful"
    );

    headless
      ? await test.step("visual test", async () => {
          await expect(page).toHaveScreenshot("checkout.png", {
            mask: [page.getByTitle("Practice Software Testing")],
          });
        })
      : console.log("Running in Headed mode, no screenshot comparison");
  });
});
