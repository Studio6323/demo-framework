import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the Login Page
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // SauceDemo specific selectors
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
  }

  /**
   * Navigate to the login page
   * @param url - The URL of the login page (optional, defaults to SauceDemo)
   */
  async goto(url?: string): Promise<void> {
    const loginUrl = url || 'https://www.saucedemo.com/';
    await this.page.goto(loginUrl);
  }

  /**
   * Enter username into the username input field
   * @param username - The username to enter
   */
  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /**
   * Enter password into the password input field
   * @param password - The password to enter
   */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Enter both username and password credentials
   * @param username - The username to enter
   * @param password - The password to enter
   */
  async enterCredentials(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
  }

  /**
   * Click the login button
   */
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Complete the login flow by entering credentials and clicking login
   * @param username - The username to enter
   * @param password - The password to enter
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterCredentials(username, password);
    await this.clickLogin();
  }

  /**
   * Check if the login page is visible/loaded
   */
  async isLoginPageVisible(): Promise<boolean> {
    return await this.usernameInput.isVisible() && 
           await this.passwordInput.isVisible() && 
           await this.loginButton.isVisible();
  }
}
