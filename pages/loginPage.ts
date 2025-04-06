import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async registerNewUser(name: string, email: string) {
    await this.page.getByPlaceholder('Name').fill(name);
    await this.page.getByPlaceholder('Email Address').fill(email);
    await this.page.getByRole('button', { name: 'Signup' }).click();
  }
}
