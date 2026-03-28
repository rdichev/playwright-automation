import { Page } from '@playwright/test';

export class HomePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://salespulse-ai-b7acd.web.app/');
    }

    async getTitle() {
        return await this.page.title();
    }

    async clickMoreInformation() {
        await this.page.click('text=More information...');
    }

    async getUrl() {
        return this.page.url();
    }
}