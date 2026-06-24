// spec: homepage_test_plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://salespulse-ai-b7acd.web.app/';

test.describe('Homepage Functionality', () => {
  test('Test Help & Features modal', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.getByRole('button', { name: 'Help & Features' }).click();

    await expect(page.getByRole('heading', { name: 'Platform Features' })).toBeVisible();
    await expect(page.getByText('Guide to using SalesPulse AI')).toBeVisible();

    await page.getByRole('button', { name: 'Got it' }).click();

    await expect(page.getByText('Upload Sales Call')).toBeVisible();
  });

  test('Close Help & Features modal via X button', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.getByRole('button', { name: 'Help & Features' }).click();
    await expect(page.getByRole('heading', { name: 'Platform Features' })).toBeVisible();

    // Close via the X button — scope to the modal overlay to avoid matching nav buttons
    const modalOverlay = page.locator('div[class*="fixed"][class*="inset-0"]');
    await modalOverlay.getByRole('button').filter({ hasNotText: 'Got it' }).click();

    await expect(page.getByRole('heading', { name: 'Platform Features' })).not.toBeVisible();
    await expect(page.getByText('Upload Sales Call')).toBeVisible();
  });

  test('Help & Features modal shows all feature sections', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.getByRole('button', { name: 'Help & Features' }).click();

    await expect(page.getByRole('heading', { name: 'Smart Audio Ingestion' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Multi-Model Intelligence' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Automated Scorecard' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sentiment & Coaching' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Interactive Transcript' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'PDF Reporting' })).toBeVisible();
  });
});