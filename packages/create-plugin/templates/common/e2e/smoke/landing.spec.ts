import {  test } from '@playwright/test';

test.describe('Landing page', () => {
  test('Landing page loads', async ({ page, baseURL }) => {
    await page.goto(baseURL); 
  });
});
