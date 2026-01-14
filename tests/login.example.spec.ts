import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SAUCEDEMO_CREDENTIALS } from '../constants/testData';

test.describe('SauceDemo Login Page', () => {
  test('should display login form elements', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    const isVisible = await loginPage.isLoginPageVisible();
    expect(isVisible).toBe(true);
  });

  test('should enter username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await page.waitForTimeout(1000); // 1 second delay between steps
    
    await loginPage.enterUsername(SAUCEDEMO_CREDENTIALS.valid.username);
    await page.waitForTimeout(1000); // 1 second delay between steps
    
    await loginPage.enterPassword(SAUCEDEMO_CREDENTIALS.valid.password);
    await page.waitForTimeout(1000); // 1 second delay between steps
    
    // Verify values were entered
    await expect(loginPage.usernameInput).toHaveValue(SAUCEDEMO_CREDENTIALS.valid.username);
    await expect(loginPage.passwordInput).toHaveValue(SAUCEDEMO_CREDENTIALS.valid.password);
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await page.waitForTimeout(1000); // 1 second delay between steps
    
    await loginPage.enterUsername(SAUCEDEMO_CREDENTIALS.valid.username);
    await page.waitForTimeout(1000); // 1 second delay between steps
    
    await loginPage.enterPassword(SAUCEDEMO_CREDENTIALS.valid.password);
    await page.waitForTimeout(1000); // 1 second delay between steps
    
    await loginPage.clickLogin();
    await page.waitForTimeout(1000); // 1 second delay between steps
    
    // After successful login, should be redirected to inventory page
    await expect(page).toHaveURL(/.*inventory\.html/);
    await page.waitForTimeout(1000); // 1 second delay between steps
    
    // 3 second delay for final verification - allows time to see the result
    await page.waitForTimeout(3000);
    
    // BEST verification: Burger menu button - appears only after successful login
    // This is a reliable header element that's always visible on authenticated pages
    await expect(page.locator('#react-burger-menu-btn')).toBeVisible();
    
    // Secondary verification: Login form should NOT be visible (confirms we left login page)
    await expect(loginPage.usernameInput).not.toBeVisible();
  });

  test('should show error message for locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await page.waitForTimeout(1000); // 1 second delay between steps
    
    await loginPage.enterUsername(SAUCEDEMO_CREDENTIALS.lockedOut.username);
    await page.waitForTimeout(1000); // 1 second delay between steps
    
    await loginPage.enterPassword(SAUCEDEMO_CREDENTIALS.lockedOut.password);
    await page.waitForTimeout(1000); // 1 second delay between steps
    
    await loginPage.clickLogin();
    await page.waitForTimeout(1000); // 1 second delay between steps
    
    // Should show error message for locked out user
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('locked out');
  });

  test('should show error message for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await page.waitForTimeout(1000); // 1 second delay between steps
    
    await loginPage.enterUsername(SAUCEDEMO_CREDENTIALS.invalid.username);
    await page.waitForTimeout(1000); // 1 second delay between steps
    
    await loginPage.enterPassword(SAUCEDEMO_CREDENTIALS.invalid.password);
    await page.waitForTimeout(1000); // 1 second delay between steps
    
    await loginPage.clickLogin();
    await page.waitForTimeout(1000); // 1 second delay between steps
    
    // Should show error message for invalid credentials
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('do not match');
  });
});
