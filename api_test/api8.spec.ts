import { test, expect } from '@playwright/test';

test('Verify Login API - API 8: Missing Parameters', async ({ request }) => {
  // Ensure BASE_URL is set, otherwise fallback to a default value
  const loginUrl = process.env.BASE_URL || 'https://automationexercise.com/api/verifyLogin';

  // Sending a POST request with missing parameters (only email is provided, missing password)
  const response = await request.post(loginUrl, {
    form: {
      email: 'fil.ale@hotmail.com',  // Only the email is provided, missing password
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  console.log('Response Status:', response.status());
  expect(response.status()).toBe(200);  

  const responseBody = await response.json();
  console.log('Response Body:', responseBody);

  expect(responseBody.message).toBe('Bad request, email or password parameter is missing in POST request.'); // 400 Response
});
