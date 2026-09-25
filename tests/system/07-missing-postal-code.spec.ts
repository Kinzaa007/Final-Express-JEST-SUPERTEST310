import { test, expect } from '@playwright/test';

test('ST-07: ไม่กรอก Postal Code ในหน้า Checkout ต้องแสดง Error', async ({ page }) => {
  // Step 1: Login
  await page.goto('/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // Step 2: Add Product & Go to Checkout
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();
  await page.locator('[data-test="checkout"]').click();

  // Step 3: Fill First Name + Last Name (Leave Postal Code empty)
  await page.locator('#first-name').fill('John');
  await page.locator('#last-name').fill('Doe');
  await page.locator('[data-test="continue"]').click();

  // Step 4: Verify Error & URL
  await expect(page.locator('[data-test="error"]')).toContainText('Error: Postal Code is required');
  await expect(page).toHaveURL(/checkout-step-one\.html/);
});