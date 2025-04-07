import { test, expect } from '@playwright/test';

test('Verify Login API - API 10: Invalid Credentials', async ({ request }) => {
  const loginUrl = `${process.env.BASE_URL}/api/verifyLogin`;

  // Sending a POST request with invalid email and password
  const response = await request.post(loginUrl, {
    data: {
      email: 'invalidEmail@example.com',  // Invalid email
      password: 'invalidPassword123',  // Invalid password
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  console.log('Response Status:', response.status());
  expect(response.status()).toBe(404);  // Expecting 404 Not Found

  const responseBody = await response.json();
  console.log('Response Body:', responseBody);

  expect(responseBody.message).toBe('User not found!');
});
