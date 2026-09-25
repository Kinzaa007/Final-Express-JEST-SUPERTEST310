import { test, expect } from '@playwright/test';

test('ST-05: เรียงลำดับสินค้าจากราคาต่ำไปสูง (Price Low to High)', async ({ page }) => {
  // Step 1: Login
  await page.goto('/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/inventory\.html/);

  // Step 2: Select Price Low to High
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  // Step 3: Verify prices are ascending
  const priceElements = page.locator('.inventory_item_price');
  const count = await priceElements.count();
  const prices: number[] = [];

  for (let i = 0; i < count; i++) {
    const priceText = await priceElements.nth(i).innerText();
    prices.push(parseFloat(priceText.replace('$', '')));
  }

  const sortedPrices = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sortedPrices);
});