// spec: homepage_test_plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Homepage Functionality', () => {
  test('Test responsive design', async ({ page }) => {
    // Navigate to the homepage URL
    await page.goto('https://salespulse-ai-b7acd.web.app/');

    // 1. Resize browser window to mobile dimensions
    await page.setViewportSize({ width: 375, height: 667 });

    // expect: Layout adjusts appropriately for mobile view
    await expect(page.getByText('Unlock insights from every conversation')).toBeVisible();

    // 2. Interact with elements in mobile view
    await page.getByRole('button', { name: 'Help & Features' }).click();

    // expect: All elements remain accessible and functional
    await expect(page.getByRole('heading', { name: 'Platform Features' })).toBeVisible();
  });
});