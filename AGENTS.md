# AGENTS.md - Playwright Automation Framework Guide

## Architecture Overview

This is a **Playwright + TypeScript test automation framework** for **SalesPulse AI**, an AI-powered web application that analyzes sales call recordings. Tests are part of a test-driven workflow using markdown-based test plans in `homepage_test_plan.md`.

### Core Components

- **`pages/`** - Page Object Model classes encapsulating page interactions (e.g., `HomePage.ts`)
- **`tests/`** - Test specifications organized by feature area (e.g., `tests/homepage/`)
- **`homepage_test_plan.md`** - Source of truth for test scenarios with semantic test steps and expectations
- **`playwright.config.ts`** - Multi-browser configuration (chromium, firefox, webkit) with parallel execution

## Test Generation Pattern

Tests are **generated from markdown test plans** and should follow this structure:

```typescript
// spec: homepage_test_plan.md          // Reference to test plan source
// seed: tests/seed.spec.ts              // Reference to seed template

import { test, expect } from '@playwright/test';

test.describe('Homepage Functionality', () => {
  test('Test name from test plan', async ({ page }) => {
    // 1. Navigate/action step (numbered comments match test plan)
    await page.goto('https://salespulse-ai-b7acd.web.app/');
    
    // expect: assertion from test plan (preserve original text)
    await expect(page.getByRole('button', { name: 'Help & Features' })).toBeVisible();
  });
});
```

**Key conventions:**
- Header comments reference `spec:` file and `seed:` file
- Test names match test plan section headings and test case names exactly
- Step comments use numbers matching test plan (e.g., `// 1.`, `// 2.`)
- Expectations prefixed with `// expect:` and preserve test plan wording
- Use `test.describe()` with `'Homepage Functionality'` as suite name

## Selector Best Practices

Prefer robust selectors in this order:

1. **Role-based** (most robust): `page.getByRole('button', { name: 'Help & Features' })`
2. **Text-based**: `page.getByText('Upload Sales Call')`
3. **Placeholder**: `page.getByPlaceholder('...')`
4. **Last resort - CSS**: `page.locator('div.upload-area')`

**URLs are hardcoded** to staging: `https://salespulse-ai-b7acd.web.app/`

## Common Testing Patterns

### Modal/Dialog Testing
```typescript
await page.getByRole('button', { name: 'Help & Features' }).click();
await expect(page.getByRole('heading', { name: 'Platform Features' })).toBeVisible();
await page.getByRole('button', { name: 'Got it' }).click();
```

### Responsive Design Testing
```typescript
await page.setViewportSize({ width: 375, height: 667 }); // Mobile
await expect(page.getByText('...')).toBeVisible(); // Check mobile layout
```

### Combobox/Dropdown Testing
```typescript
await expect(page.getByRole('combobox')).toContainText('Gemini 3.0 Flash (Fastest)');
```

### File Upload Testing
- Use `page.waitForPopup()` for file chooser dialogs
- Test both valid files (audio: MP3, WAV, M4A under 500MB) and invalid scenarios
- Error messages appear in the DOM; use text selectors to verify

## Page Object Model Guidelines

Create new page classes in `pages/` for each major page/feature:

```typescript
import { Page } from '@playwright/test';

export class HomePage {
    private page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }
    
    async goto() {
        await this.page.goto('https://salespulse-ai-b7acd.web.app/');
    }
    
    async clickHelpButton() {
        await this.page.getByRole('button', { name: 'Help & Features' }).click();
    }
}
```

**Note:** Currently only `HomePage.ts` exists; extend only when adding new page classes.

## Critical Developer Workflows

### Run Tests
```bash
npm test                          # Run all tests (parallel, 3 browsers)
npm test -- --headed              # Run in headed mode (see browser)
npm test -- --project=chromium     # Run specific browser
npm test help_features            # Run tests matching pattern
npx playwright show-report        # View HTML report after tests
```

### Compile TypeScript
```bash
npm run build                     # Compile to dist/
```

### Debug a Failing Test
1. Tests fail in CI if `test.only()` is committed → always use `.only()` for local debugging
2. Traces auto-collected on first retry (check `playwright-report/`)
3. Use `--headed --debug` to step through tests interactively

## CI/CD Behavior

- **Retries:** 2 on CI, 0 locally (configured in `playwright.config.ts`)
- **Workers:** 1 on CI, unlimited locally (parallel execution)
- **Build fails if:** Tests marked with `.only()` in CI environment
- **Reports:** HTML report generated in `playwright-report/`

## Test Plan Reference Structure

The `homepage_test_plan.md` defines numbered test scenarios with:
- **File path** where test should live (e.g., `tests/homepage/help_features.spec.ts`)
- **Seed file** to clone from (e.g., `tests/seed.spec.ts`)
- **Steps** (numbered 1, 2, etc.)
- **Expectations** following each step (prefixed with "expect:")

Use this structure when generating tests—map test plan sections to test files exactly.

## Key Files & Their Roles

| File | Purpose |
|------|---------|
| `homepage_test_plan.md` | Single source of truth for test scenarios |
| `tests/seed.spec.ts` | Template for generated tests (minimal stub) |
| `tests/homepage/*.spec.ts` | Generated test files (one per scenario) |
| `pages/HomePage.ts` | Page Object encapsulating UI interactions |
| `playwright.config.ts` | Playwright config: browsers, reporters, parallelization |
| `package.json` | Dependencies: `@playwright/test`, TypeScript |

## When Adding New Tests

1. **Add scenario to `homepage_test_plan.md`** with numbered steps and expectations
2. **Create new test file** at path specified in test plan (e.g., `tests/homepage/new_feature.spec.ts`)
3. **Use this template** and map test plan sections:
   - Header comments: `// spec:` and `// seed:` references
   - Test name matches test plan section heading
   - Comments align with test plan step numbers and expectations
   - Prefer page object methods over inline locators (future refactor)
4. **Run locally** with `npm test -- --headed` before committing

