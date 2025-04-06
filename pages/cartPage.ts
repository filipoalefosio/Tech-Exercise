import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async goToCart() {
    await this.page.click('a[href="/view_cart"]');
  }

  async proceedToCheckout() {
    await this.page.click('a[class*="check_out"]');
  }
}