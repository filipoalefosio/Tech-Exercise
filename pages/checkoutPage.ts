 import { Page } from '@playwright/test';

export class CheckoutPage {
  private placeOrderButton: any;

  constructor(private page: Page) {
    this.placeOrderButton = page.locator('a[href="/payment"]'); // Making sure the button is visible or interactable.
  }
 
  async placeOrder() {
    //await this.placeOrderButton.waitFor({ state: 'visible', timeout: 60000 });

      await this.placeOrderButton.click();
  }  
}
