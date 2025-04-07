import { test, expect, request } from '@playwright/test';

test('Verify Login API - API 7: Successful Login', async () => {
  const loginUrl = 'https://automationexercise.com/api/verifyLogin';
  
  // Create a new API request context
  const apiContext = await request.newContext();

  // Send the POST request with valid credentials
  const response = await apiContext.post(loginUrl, {
    data: {
      email: 'validEmail@example.com',  // Use any valid email
      password: 'D3v3nv1r0m3nt',  // Replace with test or dev password dependant on what env you use
    },
  });

  // Verify the response status
  expect(response.status()).toBe(200);  // Ensure the response status is 200 (OK)

  // Optionally, you can validate the response body
  const responseBody = await response.json();
  console.log('Response Body:', responseBody); // Log the response to check its content
  expect(responseBody).toHaveProperty('message', 'Bad request, email or password parameter is missing in POST request.');
});
