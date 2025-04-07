import { test, expect } from '@playwright/test';

test('Verify Login API - API 9: Invalid Method (DELETE)', async ({ request }) => {
  // Ensure BASE_URL is set, otherwise fallback to a default value
  const loginUrl = process.env.BASE_URL || 'https://automationexercise.com/api/verifyLogin';

  // Sending a DELETE request, which should not be allowed
  const response = await request.delete(loginUrl, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  console.log('Response Status:', response.status());
  expect(response.status()).toBe(200);  
  
  const responseBody = await response.json();
  console.log('Response Body:', responseBody);

  // Verify the message in the response
  expect(responseBody.message).toBe('This request method is not supported.'); // Expecting 405 Method Not Allowed
});
