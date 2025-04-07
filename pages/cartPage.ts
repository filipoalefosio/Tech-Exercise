import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async proceedToCheckout() {
    try {
      // Try to click the button normally using Playwright's locator method
      await this.page.locator('a.check_out:visible').click();
    } catch (error) {
      console.log('Playwright click failed, using JavaScript to force the click');
      
      // If the Playwright click fails, use JavaScript to force the click
      await this.page.evaluate(() => {
        const button = document.querySelector('a.check_out');
        
        // Check if the button exists and ensure it's an instance of HTMLElement
        if (button && button instanceof HTMLElement && button.offsetParent !== null) {
          (button as HTMLElement).click(); // Cast the button to an HTMLElement and click it
        }
      });
    }
  }
}
