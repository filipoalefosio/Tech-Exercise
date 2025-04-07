import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async proceedToCheckout() {
    const checkoutButtonXPath = '/html/body/section/div/section/div[1]/div/div/a';

    try {
      // Wait for the element to be visible before clicking it using XPath
      const checkoutButton = this.page.locator(checkoutButtonXPath);
      await checkoutButton.waitFor({ state: 'visible', timeout: 5000 }); // Wait for the button to be visible

      // Try to click the button using Playwright's locator method
      await checkoutButton.click();
    } catch (error) {
      console.log('Playwright click failed, using JavaScript to force the click');
      
      // If the Playwright click fails, use JavaScript to force the click
      await this.page.evaluate((xpath) => {
        const button = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        
        // Check if the button exists and ensure it's an instance of HTMLElement
        if (button && button instanceof HTMLElement && button.offsetParent !== null) {
          (button as HTMLElement).click(); // Cast the button to an HTMLElement and click it
        }
      }, checkoutButtonXPath);
    }
  }
}
