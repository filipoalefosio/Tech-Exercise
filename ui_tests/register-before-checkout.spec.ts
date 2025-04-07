import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { HomePage } from '../pages/homePage';
import { SignupPage } from '../pages/signupPage';

const name = faker.person.firstName();
const email = faker.internet.email();

const password = 'D3v3nv1r0m3nt';
const address = faker.location.streetAddress();

test('Test Case 15: Register before Checkout', async ({ page }) => {
  const home = new HomePage(page);
  const signup = new SignupPage(page);

  await home.navigate();
  await home.clickSignupLogin();

  await signup.enterSignupDetails(name, email);
  await signup.fillAccountDetails(password, address);

  await expect(page.url()).toMatch(/\/signup/);
});