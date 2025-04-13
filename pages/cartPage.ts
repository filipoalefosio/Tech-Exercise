import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async placeOrder() {
    const checkoutBtn = this.page.locator('a.btn.check_out', { hasText: 'Proceed To Checkout' });

    //await checkoutBtn.waitFor({ state: 'visible', timeout: 15000 });
    await checkoutBtn.click();
  }
}