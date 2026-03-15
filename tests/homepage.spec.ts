import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('HomePage Test Suite', () => {
    test('should load the homepage', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        const title = await homePage.getTitle();
        expect(title).toBe('SalesPulse AI');
    });

    test('should load the correct URL', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        expect(await homePage.getUrl()).toBe('http://localhost:3000/');
    });
});