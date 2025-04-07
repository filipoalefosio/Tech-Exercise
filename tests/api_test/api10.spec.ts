import { test, expect } from '@playwright/test';

test('Verify Login API - API 10: Invalid Credential', async ({ request }) => {
  // Ensure BASE_URL is set, otherwise fallback to a default value
  const loginUrl = process.env.BASE_URL || 'https://automationexercise.com/api/verifyLogin';

  // Sending a POST request with invalid email and password using x-www-form-urlencoded format
  const response = await request.post(loginUrl, {
    data: new URLSearchParams({
      email: 'fil.ale@hotmail.comf',  // Invalid email
      password: 'Password1234',  // Invalid password
    }).toString(), 
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  console.log('Response Status:', response.status());
  expect(response.status()).toBe(200);  // Expecting 200 for invalid credentials

  const responseBody = await response.json();
  console.log('Response Body:', responseBody);

  // Validate the message for invalid credentials
  expect(responseBody.message).toBe('User not found!'); // Expecting "User not found!"
});
