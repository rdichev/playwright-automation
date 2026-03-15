import { test, expect } from '@playwright/test';
import { ExamplePage } from '../pages/ExamplePage';

test.describe('Example Test Suite', () => {
    test('should load the homepage', async ({ page }) => {
        const examplePage = new ExamplePage(page);
        await examplePage.goto();
        const title = await examplePage.getTitle();
        expect(title).toBe('SalesPulse AI');
    });

    test('should load the correct URL', async ({ page }) => {
        const examplePage = new ExamplePage(page);
        await examplePage.goto();
        expect(await examplePage.getUrl()).toBe('http://localhost:3000/');
    });
});