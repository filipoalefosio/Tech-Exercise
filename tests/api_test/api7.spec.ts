import { test, expect, request } from '@playwright/test';

test('Verify Login API - API 7: Successful Login', async () => {
  const loginUrl = 'https://automationexercise.com/api/verifyLogin';
  
  // New API request context
  const apiContext = await request.newContext();

  // POST request with valid credentials
  const response = await apiContext.post(loginUrl, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',  // Setting the Content-Type header
    },
    form: {
      email: 'fil.ale@hotmail.com',  // Replace with the email you setup the account with
      password: 'password123',  // Replace with the password you used to setup account with
    },
  });

  // Verify the response status
  expect(response.status()).toBe(200);  
  // Validate the response body
  const responseBody = await response.json();
  console.log('Response Body:', responseBody); 
  expect(responseBody).toHaveProperty('message', 'User exists!');
});
