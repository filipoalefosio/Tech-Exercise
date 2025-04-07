import { test, expect } from '@playwright/test';

test('Verify Login API - API 8: Missing Parameters', async ({ request }) => {
  const loginUrl = `${process.env.BASE_URL}/api/verifyLogin`;

  // Sending a POST request with missing parameters
  const response = await request.post(loginUrl, {
    data: {
      password: 'validPassword123',  // Missing email
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  console.log('Response Status:', response.status());
  expect(response.status()).toBe(400);  // Expecting 400 Bad Request

  const responseBody = await response.json();
  console.log('Response Body:', responseBody);

  expect(responseBody.message).toBe('Bad request, email or password parameter is missing in POST request.');
});
