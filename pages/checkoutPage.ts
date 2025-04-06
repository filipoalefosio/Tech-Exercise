import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async placeOrder() {
    await this.page.click('a[href="/payment"]');
  }
}