import { Page } from '@playwright/test';

export class PaymentPage {
  constructor(private page: Page) {}

  async fillPaymentDetails(name: string, card: string, cvc: string, month: string, year: string) {
    await this.page.fill('input[name="name_on_card"]', name);
    await this.page.fill('input[name="card_number"]', card);
    await this.page.fill('input[name="cvc"]', cvc);
    await this.page.fill('input[name="expiry_month"]', month);
    await this.page.fill('input[name="expiry_year"]', year);
    await this.page.click('button[id="submit"]');
  }
}