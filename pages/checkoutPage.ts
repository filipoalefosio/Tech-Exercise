import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  /**
   * Clicks the "Place Order" button to go to the payment page
   */
  async placeOrder() {
    const placeOrderBtn = this.page.locator('a.btn.check_out', { hasText: 'Place Order' });
    await placeOrderBtn.click({ timeout: 10000 }); // Increased timeout
  }
}