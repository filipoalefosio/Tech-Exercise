import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/');
  }

  async clickSignupLogin() {
    await this.page.click('a[href="/login"]');
  }

  async goToProducts() {
    await this.page.click('a[href="/products"]');
  }

  async addFirstProductToCart() {
    await this.page.click('a[data-product-id="1"]');
  }

  async goToCart() {
    await this.page.click('a[href="/view_cart"]');
  }
}