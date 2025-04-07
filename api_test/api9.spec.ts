import { test, expect } from '@playwright/test';

test('Verify Login API - API 9: Invalid Method (DELETE)', async ({ request }) => {
  const loginUrl = `${process.env.BASE_URL}/api/verifyLogin`;

  // Sending a DELETE request, which should not be allowed
  const response = await request.delete(loginUrl, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  console.log('Response Status:', response.status());
  expect(response.status()).toBe(405);  // Expecting 405 Method Not Allowed

  const responseBody = await response.json();
  console.log('Response Body:', responseBody);

  expect(responseBody.message).toBe('This request method is not supported.');
});
