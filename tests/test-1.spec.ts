import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://salespulse-ai-b7acd.web.app/');
  await expect(page.getByRole('combobox')).toContainText('Gemini 3.0 Flash (Fastest)Gemini 3.0 Pro (Best Quality)');
  await page.getByRole('combobox').selectOption('gemini-3-pro-preview');
});