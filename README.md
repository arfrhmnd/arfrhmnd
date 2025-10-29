# Playwright Test Automation Framework

A robust end-to-end test automation framework built with Playwright and TypeScript, featuring Page Object Model design pattern and Allure reporting integration.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [Test Scenarios](#test-scenarios)
- [Configuration](#configuration)
- [CI/CD Integration](#cicd-integration)

## 🎯 Overview

This framework is designed for automated testing of web applications using Playwright. It follows industry best practices including:
- **Page Object Model (POM)** design pattern for maintainable test code
- **TypeScript** for type safety and better IDE support
- **Allure Reports** for comprehensive test reporting
- **Parallel test execution** for faster test runs
- **Cross-browser testing** support

## 🛠️ Tech Stack

- **Playwright** v1.56.1 - Modern end-to-end testing framework
- **TypeScript** - Typed superset of JavaScript
- **Node.js** - JavaScript runtime
- **Allure Playwright** v3.4.1 - Advanced test reporting
- **CommonJS** module system

## 📁 Project Structure

```
playwright/
├── tests/
│   ├── page-object/          # Page Object Model classes
│   │   └── homePage.ts       # HomePage page object
│   └── steps/                # Test specification files
│       ├── photonHome.spec.ts    # Home page tests
│       ├── contactUs.spec.ts     # Contact us form tests
│       └── aboutUs.spec.ts       # About us page tests
├── allure-results/           # Raw Allure test results
├── allure-report/            # Generated Allure HTML reports
├── playwright-report/        # Native Playwright HTML reports
├── test-results/             # Test execution artifacts
├── playwright.config.ts      # Playwright configuration
├── package.json              # Project dependencies
└── README.md                 # This file
```

## ✅ Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **Allure Command Line** (for generating reports)

### Installing Allure Command Line

**macOS:**
```bash
brew install allure
```

**Windows:**
```bash
scoop install allure
```

**Linux:**
```bash
npm install -g allure-commandline --save-dev
```

## 🚀 Installation

1. Clone the repository:
```bash
cd /Users/arief_r/Documents/automation\ file/playwright
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run tests with clean results
```bash
npm run test:clean
```

### Run tests and generate Allure report
```bash
npm run test:report
```

### Run specific test file
```bash
npx playwright test tests/steps/photonHome.spec.ts
```

### Run tests by tag
```bash
npx playwright test --grep @HomePage
npx playwright test --grep @ContactUs
```

### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

### Run tests in specific browser
```bash
npx playwright test --project=chromium
```

### Run specific tests with clean Allure reports
When running tests by tag, always clean old results first to avoid mixed reports:

```bash
# Clean results and run specific tag
rm -rf allure-results && npx playwright test --grep @AboutUs

# Clean, run, generate and open report (one-liner)
rm -rf allure-results && npx playwright test --grep @AboutUs && npm run allure:generate && npm run allure:open
```

**Available test tags:**
- `@HomePage` - Home page navigation tests
- `@ContactUs` - Contact form tests
- `@AboutUs` - About Us page tests

**Why clean results?**
Allure accumulates test results in `allure-results/`. Without cleaning, reports show both old and new test runs mixed together, which can be confusing when running specific tests.

## 📊 Test Reports

### Allure Reports

#### Generate Allure report
```bash
npm run allure:generate
```

#### Open Allure report
```bash
npm run allure:open
```

#### View report directly (temporary server)
```bash
allure serve allure-results
```

## 🧩 Test Scenarios

### Home Page Tests (@HomePage)
| Test Case | Description |
|-----------|-------------|
| Navigate to home page | Verifies user can access the home page and see the logo |
| Click About Us menu | Validates navigation to About Us section |
| Click Contact Us menu | Validates navigation to Contact Us section |
| Fill Newsletter form | Tests newsletter subscription functionality |

### Contact Us Tests (@ContactUs)
| Test Case | Description |
|-----------|-------------|
| View contact form fields | Verifies all form fields are visible |
| Fill contact form | Tests filling and submitting the contact form |
| Submit with different subject | Tests form submission with career inquiries |

### About Us Tests (@AboutUs)
| Test Case | Description |
|-----------|-------------|
| View About Us page | Verifies user can navigate to About Us section and see the vision content |

## ⚙️ Configuration

The framework is configured via `playwright.config.ts`:

### Key Configuration Settings:

- **Test Directory**: `./tests`
- **Parallel Execution**: Enabled by default
- **Retries**: 2 retries on CI, 0 locally
- **Workers**: 1 on CI, unlimited locally
- **Trace**: Captured on first retry
- **Browser**: Chromium (Desktop Chrome)
- **Reporter**: Allure Playwright

### Environment Configuration:

The framework includes environment info in reports:
- **Report Title**: Playwright Test Automation Report
- **Test Environment**: Staging
- **Execution Date**: Auto-populated

## 🔄 CI/CD Integration

The framework is CI-ready with the following features:

- **Fail-fast**: Tests fail if `test.only` is accidentally left in code
- **Retry mechanism**: Automatic retries on CI (configurable)
- **Serial execution on CI**: Prevents resource conflicts
- **Environment detection**: Automatically adjusts behavior based on `CI` environment variable

### Example CI Configuration (GitHub Actions)

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 18
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npm test
    - uses: actions/upload-artifact@v3
      if: always()
      with:
        name: allure-results
        path: allure-results/
        retention-days: 30
```

## 🏗️ Architecture

### Page Object Model (POM)

The framework uses the Page Object Model pattern to separate test logic from page-specific code:

**Example:**
```typescript
// Page Object
export class homePage {
  constructor(private readonly page: Page) { }
  
  async goto() {
    await this.page.goto('https://48997458.hs-sites.com/phtn.ai-homepage');
  }
}

// Test Usage
const MainPage = new homePage(page);
await MainPage.goto();
```

### Benefits:
- **Maintainability**: Changes to UI elements require updates in one place
- **Reusability**: Page objects can be shared across multiple tests
- **Readability**: Tests are more descriptive and easier to understand

## 📝 Writing New Tests

1. **Create Page Object** (if needed):
```typescript
// tests/page-object/newPage.ts
import { Page } from '@playwright/test';

export class NewPage {
  constructor(private readonly page: Page) { }
  
  async navigateToPage() {
    await this.page.goto('URL_HERE');
  }
  
  async clickButton() {
    await this.page.locator('selector').click();
  }
}
```

2. **Create Test Spec**:
```typescript
// tests/steps/newTest.spec.ts
import { test, expect } from '@playwright/test';
import { NewPage } from '../page-object/newPage';

test.describe('@NewFeature', () => {
  test('Test scenario description', async ({ page }) => {
    const pageObject = new NewPage(page);
    await pageObject.navigateToPage();
    // Add your test steps here
  });
});
```

## 🐛 Debugging

### View test traces
```bash
npx playwright show-trace trace.zip
```

### Run with Playwright Inspector
```bash
npx playwright test --debug
```

### Generate screenshot on failure
Add to test:
```typescript
await page.screenshot({ path: 'screenshot.png' });
```

## 📦 NPM Scripts Reference

| Script | Command | Description |
|--------|---------|-------------|
| `test` | `npx playwright test` | Run all tests |
| `test:clean` | `rm -rf allure-results && npx playwright test` | Clean results and run tests |
| `allure:generate` | `allure generate allure-results --clean -o allure-report` | Generate Allure report |
| `allure:open` | `allure open allure-report` | Open Allure report in browser |
| `test:report` | Full pipeline | Clean, test, generate and open report |

## 🤝 Contributing

1. Create a feature branch
2. Add your tests following the existing patterns
3. Ensure all tests pass
4. Submit a pull request

## 📄 License

ISC

## 👥 Author ARF

Automation Team

---

**Happy Testing! 🎭**

