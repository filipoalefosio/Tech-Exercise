import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { HomePage } from '../pages/homePage';
import { SignupPage } from '../pages/signupPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { PaymentPage } from '../pages/paymentpage';

const name = faker.person.fullName();
const email = faker.internet.email();
const password = 'D3v3nv1r0m3nt';
const address = faker.location.streetAddress();
const card = faker.finance.creditCardNumber();
const cvc = '123';
const expiryMonth = '12';
const expiryYear = '2027';

test('Test Case 14: Place Order: Register while Checkout', async ({ page }) => {
  const home = new HomePage(page);
  const signup = new SignupPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);
  const payment = new PaymentPage(page);

  await home.navigate();
  await home.clickSignupLogin();
  await signup.enterSignupDetails(name, email);
  await signup.fillAccountDetails(password, address);

  await page.click('a[href="/"]'); // go to home
  await page.click('a[href="/products"]');
  await page.click('a[data-product-id="1"]'); // add product to cart
  await page.click('a[href="/view_cart"]');

  await cart.proceedToCheckout();
  await checkout.placeOrder();
  await payment.fillPaymentDetails(name, card, cvc, expiryMonth, expiryYear);

  await expect(page.locator('h2')).toContainText('Order Placed!');
});