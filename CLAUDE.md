# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm test                              # Run all tests (parallel, 3 browsers)
npm test -- --headed                  # Run with visible browser
npm test -- --project=chromium        # Run on a single browser
npm test -- help_features             # Run tests matching a filename pattern
npm test -- --debug                   # Step through tests interactively
npx playwright show-report            # Open HTML report after a run
npm run build                         # Compile TypeScript to dist/
```

## Architecture

This is a **Playwright + TypeScript** end-to-end test framework for **SalesPulse AI** (`https://salespulse-ai-b7acd.web.app/`), an AI-powered sales call analysis app.

### Test generation workflow

Tests are derived from `homepage_test_plan.md`, which is the single source of truth for what to test. Each scenario in the plan specifies:
- The target file path (e.g., `tests/homepage/help_features.spec.ts`)
- A seed file to clone from (`tests/seed.spec.ts`)
- Numbered steps and `expect:` assertions

Generated test files must include header comments linking back to their source:
```typescript
// spec: homepage_test_plan.md
// seed: tests/seed.spec.ts
```

### Page Object Model

Page classes live in `pages/` and encapsulate all locators and actions for a page. Tests import these classes rather than using inline locators directly. Currently only `pages/HomePage.ts` exists — add new classes here when covering new pages.

### Selector priority

Use selectors in this order of preference:
1. Role-based: `page.getByRole('button', { name: 'Help & Features' })`
2. Text-based: `page.getByText('Upload Sales Call')`
3. Placeholder: `page.getByPlaceholder('...')`
4. CSS (last resort): `page.locator('div.upload-area')`

### CI behaviour

- Retries: 2 on CI, 0 locally
- Workers: 1 on CI, unlimited locally
- `test.only()` causes CI build failure — only use it for local debugging
- Traces are collected on first retry and saved to `playwright-report/`

### File upload testing notes

- Valid audio formats: MP3, WAV, M4A under 500MB
- Use `page.waitForPopup()` for file chooser dialogs
- Error messages appear in the DOM; use text selectors to verify them

## Adding new tests

1. Add the scenario to `homepage_test_plan.md` with numbered steps and `expect:` lines
2. Create the test file at the path specified in the plan (under `tests/homepage/`)
3. Start the file with `// spec:` and `// seed:` header comments
4. Use `test.describe()` matching the plan's top-level section name, and match test names exactly to scenario headings
5. Run locally with `npm test -- --headed` before committing
