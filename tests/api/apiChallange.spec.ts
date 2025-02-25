import { test, expect } from "@playwright/test";

test.describe("Api", async () => {
  test("GET /products/{id}", async ({ request }) => {
    const apiUrl = "https://api.practicesoftwaretesting.com";
    const productResponse = await request.get(
      apiUrl + "/products/search?q=thor%20hammer"
    );
    expect(productResponse.status()).toBe(200);
    const productBody = await productResponse.json();
    const productId = productBody.data[0].id;

    const response = await request.get(apiUrl + "/products" + productId);
    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body.in_stock).toBe(true);
    expect(body.is_location_offer).toBe(false);
    expect(body.is_rental).toBe(false);
    expect(body.name).toBe("Thor Hammer");
    expect(body.price).toBe(11.14);
  });
});
