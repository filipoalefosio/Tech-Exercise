import { Page } from '@playwright/test';

export class SignupPage {
  constructor(private page: Page) {}

  async enterSignupDetails(name: string, email: string) {
    await this.page.fill('input[data-qa="signup-name"]', name);
    await this.page.fill('input[data-qa="signup-email"]', email);
    await this.page.click('button[data-qa="signup-button"]');
  }

  async fillAccountDetails(password: string, address: string) {
    await this.page.fill('input[name="password"]', password);
    await this.page.fill('input[name="address1"]', address);
    await this.page.click('button[data-qa="create-account"]');
  }
}