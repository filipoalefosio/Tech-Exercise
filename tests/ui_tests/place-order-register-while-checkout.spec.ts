import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { HomePage } from '../../pages/homePage';
import { SignupPage } from '../../pages/signupPage';
import { CartPage } from '../../pages/cartPage';
import { CheckoutPage } from '../../pages/checkoutPage';
import { PaymentPage } from '../../pages/paymentPage';

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

  // 1-3. Launch browser, go to site, and verify home page
  await home.navigate();
  await expect(page).toHaveTitle('Automation Exercise');

  // 4. Add products to cart
  await page.click('a[href="/products"]');
  await page.click('a[data-product-id="1"]');
  await page.waitForSelector('p.text-center', { state: 'visible' }); // 'Product added' confirmation
  await page.click('button:has-text("Continue Shopping")');

  // 5-6. Go to Cart page and verify
  await page.click('a[href="/view_cart"]');
  await expect(page).toHaveURL(/.*view_cart/);
  await expect(page.locator('button.disabled')).toHaveText('1');

  // 7. Click Proceed to Checkout
  await cart.placeOrder();

  // 8. Click 'Register / Login'
  await page.click('button:has-text("Continue On Cart")');
  await page.click('a[href="/login"]');

  // 9. Step 1: Enter email to sign up
  await page.fill('input[data-qa="signup-email"]', email); // Email field using the data-qa attribut 
  await page.fill('input[name="name"]', name); // Full name field
  await page.click('button[data-qa="signup-button"]'); // Sign-up button
  
  
  // 9. Step 2: Fill out account details
  await page.check('input[id="id_gender1"]');//Selecting gender radio button
  await page.fill('input[name="name"]', name); // Full name field
  await page.fill('input[name="password"]', password); // Password field
  await page.selectOption('select[data-qa="days"]', { value: '5' }); // Day of birth
  await page.selectOption('select[data-qa="months"]', { value: '1' }); // Month of birth (January)
  await page.selectOption('select[data-qa="years"]', { value: '1990' }); // Year of birth (1990)
  await page.fill('input[data-qa="first_name"]', 'John'); // Replace 'John' with the first name you want to use
  await page.fill('input[data-qa="last_name"]', 'Doe'); // Replace 'Doe' with the last name you want to use
  await page.fill('input[data-qa="company"]', 'TechCorp'); // Replace 'TechCorp' with the company name you want to use
  await page.fill('input[data-qa="address"]', address); // Street address
  await page.fill('input[data-qa="address2"]', faker.location.secondaryAddress()); // e.g., Apt. 5B etc
  await page.selectOption('select[data-qa="country"]', { label: 'United States' }); // Country dropdown
  await page.fill('input[data-qa="state"]', 'California'); // State text box
  await page.fill('input[data-qa="city"]', 'Los Angeles'); // City text box
  await page.fill('input[data-qa="zipcode"]', '90001'); // Zipcode field
  await page.fill('input[data-qa="mobile_number"]', faker.phone.number()); // Mobile number
  await page.click('button[data-qa="create-account"]'); // Create account button

  // 10. Verify 'ACCOUNT CREATED!' and click 'Continue'
  await expect(page.locator('b')).toHaveText('Account Created!');
  await page.click('[data-qa="continue-button"]');

  // 11. Verify 'Logged in as username'
  await expect(page.locator('a:has(i.fa-user)')).toContainText(`Logged in as ${name}`);

  // 12-13. Go back to Cart and proceed to checkout again
  await page.click('a[href="/view_cart"]');
  await cart.placeOrder();
  await expect(page).toHaveURL(/.*\/checkout/);

  // 14. Verify Address Details and Order Summary
  await expect(page.locator('h3.page-subheading:has-text("Your delivery address")')).toBeVisible();
  await expect(page.locator('h3.page-subheading:has-text("Your billing address")')).toBeVisible();
  await expect(page.locator('h2.heading:has-text("Review Your Order")')).toBeVisible();

 

  // 15. Add comment and click 'Place Order'
  await page.fill('textarea[name="message"]', 'Please deliver between 5-6pm');
  //await page.click('a.btn.btn-default.check_out');
  await checkout.placeOrder();
  //await page.pause();
  await expect(page).toHaveURL('https://automationexercise.com/payment');

  // 16-17. Enter payment details and confirm order
  await payment.fillPaymentDetails(name, card, cvc, expiryMonth, expiryYear);
  //await page.click('button[data-qa="pay-button"]'); //Clicking Pay and Confirm Order
  await expect(page.locator('b:has-text("Order Placed!")')).toBeVisible();

  // 19-20. Delete account and confirm
  await page.click('a[href="/delete_account"]:has-text("Delete Account")');
  await expect(page.locator('b:has-text("Account Deleted!")')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');
});
