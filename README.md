# Playwright Automation Project

This project is an automation framework built using Playwright and TypeScript. It provides a structured way to write and execute browser tests.

## Project Structure

```
playwright-automation
├── tests
│   ├── example.spec.ts
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd playwright-automation
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the tests:**
   ```
   npx playwright test
   ```

## Usage

- The test cases are located in the `tests` directory. You can add your own test files following the naming convention `*.spec.ts`.
- Modify the `playwright.config.ts` file to customize the test settings, such as timeouts and browser options.

## Contributing

Feel free to submit issues or pull requests to improve the project.