import { test, expect } from '@playwright/test';

test('ST-06: ลบสินค้าออกใน Cart ก่อนเข้าสู่ Checkout Overview', async ({ page }) => {
  // Step 1: Login
  await page.goto('/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // Step 2: Add 2 Products
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

  // Step 3: Go to Cart
  await page.locator('.shopping_cart_link').click();
  await expect(page).toHaveURL(/cart\.html/);

  // Step 4: Remove 1 Product (Bike Light)
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Step 5: Checkout
  await page.locator('[data-test="checkout"]').click();
  await page.locator('#first-name').fill('John');
  await page.locator('#last-name').fill('Doe');
  await page.locator('#postal-code').fill('10110');
  await page.locator('[data-test="continue"]').click();

  // Step 6: Verify Overview ต้องเหลือเพียง 1 Product (Backpack)
  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await expect(page.locator('.cart_item')).toHaveCount(1);
  await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
});