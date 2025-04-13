import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { HomePage } from '../../pages/homePage';
import { SignupPage } from '../../pages/signupPage';
import { CartPage } from '../../pages/cartPage';
import { CheckoutPage } from '../../pages/checkoutPage';
import { PaymentPage } from '../../pages/paymentPage';

const name = faker.person.firstName();
const email = faker.internet.email();
const password = 'D3v3nv1r0m3nt';
const address = faker.location.streetAddress();
const card = faker.finance.creditCardNumber();
const cvc = '123';
const expiryMonth = '12';
const expiryYear = '2027';

test('Test Case 15: Register before Checkout', async ({ page }) => {
  const home = new HomePage(page);
  const signup = new SignupPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);
  const payment = new PaymentPage(page);

  // 1-3. Launch browser, navigate to URL, and verify homepage
  await home.navigate();
  await expect(page).toHaveTitle('Automation Exercise');
  
  // 4. Click 'Signup / Login' button
  await home.clickSignupLogin();
  
  // 4. Fill all details in Signup and create account
  await page.fill('input[data-qa="signup-email"]', email); // Email field using the data-qa attribut 
  await page.fill('input[name="name"]', name); // Full name field
  await page.click('button[data-qa="signup-button"]'); // Sign-up button
  
  
  // 5. Step 2: Fill out account details
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
  
  // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
  await expect(page.locator('b:has-text("Account Created!")')).toBeVisible();
  await page.click('a.btn.btn-primary'); // Continue button
  
  // 7. Verify 'Logged in as username' at the top
  await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();

  
  // 8. Add products to cart
  await page.click('a[href="/products"]');
  await page.click('a[data-product-id="1"]');
  await page.waitForSelector('p.text-center', { state: 'visible' }); // Product added confirmation
  await page.click('button:has-text("Continue Shopping")');
  
  // 9. Click 'Cart' button
  await page.click('a[href="/view_cart"]');
  
  // 10. Verify that the cart page is displayed
  await expect(page).toHaveURL(/.*view_cart/);
  
  // 11. Click 'Proceed to Checkout'
  await cart.placeOrder();
  
  // 12. Verify Address Details and Review Your Order
  await expect(page.locator('h3.page-subheading:has-text("Your delivery address")')).toBeVisible();
  await expect(page.locator('h3.page-subheading:has-text("Your billing address")')).toBeVisible();
  await expect(page.locator('h2.heading:has-text("Review Your Order")')).toBeVisible();
  
  // 13. Enter description in comment text area and click 'Place Order'
  await page.locator('textarea[name="message"]').fill('Please deliver between 5-6pm');
  await checkout.placeOrder();
  await expect(page).toHaveURL(/.*\/payment/);
  
  // 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
  await payment.fillPaymentDetails(name, card, cvc, expiryMonth, expiryYear);
  
  // 15. Order Placed! assertion 
  await expect(page.locator('b:has-text("Order Placed!")')).toBeVisible();
  
  // 16. Click 'Continue' button
  await page.click('a[data-qa="continue-button"]');
  
  // 17. Click 'Delete Account' button
  await page.click('a[href="/delete_account"]');
  
  // 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  await expect(page.locator('b')).toHaveText('Account Deleted!');
  await page.click('a[data-qa="continue-button"]'); // Continue button
});
