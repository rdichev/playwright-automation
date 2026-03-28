// spec: homepage_test_plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Homepage Functionality', () => {
  test('Test Help & Features modal', async ({ page }) => {
    // Navigate to the homepage URL
    await page.goto('https://salespulse-ai-b7acd.web.app/');

    // 1. Click on the 'Help & Features' button
    await page.getByRole('button', { name: 'Help & Features' }).click();

    // expect: Help & Features modal opens with 'Platform Features' heading
    await expect(page.getByRole('heading', { name: 'Platform Features' })).toBeVisible();

    // expect: detailed feature descriptions
    await expect(page.getByText('Guide to using SalesPulse AI')).toBeVisible();

    // 2. Click on the 'Got it' button in the modal
    await page.getByRole('button', { name: 'Got it' }).click();

    // expect: Modal closes and page returns to original state
    await expect(page.getByText('Upload Sales Call')).toBeVisible();
  });
});