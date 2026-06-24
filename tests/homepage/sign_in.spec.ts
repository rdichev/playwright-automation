// spec: homepage_test_plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://salespulse-ai-b7acd.web.app/';

test.describe('Homepage Functionality', () => {
  test('Sign In button opens Google sign-in popup', async ({ page }) => {
    await page.goto(BASE_URL);

    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByRole('button', { name: 'Sign In' }).click(),
    ]);

    await popup.waitForURL('**/accounts.google.com/**');
    expect(popup.url()).toContain('accounts.google.com');
  });
});
