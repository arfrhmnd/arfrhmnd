<INSTRUCTIONS>:
These are the specific steps required to complete the current task.
Your tasked with generating a maintainable and scalable Web Automation Framework using WebdriverIO.
Follow these steps:
1. Use WebdriverIO with TypeScript as the primary framework.
2. Create a project structure that follows best practices (separate tests, page objects, utilities, configs).
3. Implement reusable methods for common actions (click, type, wait, screenshot).
4. Ensure test cases are modular, data-driven, and easy to extend.
5. Include proper reporting, error handling, and CI/CD readiness.
6. Follow all rules and constraints outlined in the context.

<CONTEXT>:
This section contains the background information that the AI needs.
The automation framework must be designed for web UI functional testing of http://48997458.hs-sites.com/phtn.ai-homepage using industry best practices.

- **Technology Stack**:
  - Framework: WebdriverIO (latest version)
  - Language: TypeScript
  - Test Runner: Mocha (preferred)
  - Build Tool: npm
  - Reporting: wdio-html-nice-reporter

- **Framework Architecture**:
  - Use Page Object Model (POM).
  - Locators and page actions must be placed in page classes under `/pageobjects`.
  - Tests should only contain high-level steps and assertions.
  - Include a `wdio.conf.js` file for environment setup and driver configuration.
  - Use a `config` folder (JSON/JS) for environment variables, URLs, credentials, and browser setup.
  - Create a `utils` folder for reusable helpers (waits, screenshots, logging).

- **Test Case Organization**:
  - One test class per feature/module.
  - One test method per scenario.
  - Group tests with tags (@smoke, @regression).
  - Support data-driven testing (JSON/CSV).

- **CI/CD & Scalability**:
  - Tests must run via `npx wdio run ./wdio.conf.js`.
  - Allow parameterization (browser, environment) from CLI.
  - Ensure framework can be integrated into Jenkins or GitHub Actions.

- **Error Handling & Reporting**:
  - Capture screenshots for failed tests.
  - Generate Allure Reports after execution.
  - Include retry logic for flaky tests (Mocha retries).


<OUTPUT_FORMAT>:
This defines the exact structure for the final output
The final output must include:
1. Project folder structure
2. Example Page Object class
3. Example Test class with at least two test methods
4. Example Utility function
5. Example Config file
6. Instructions on how to run the tests (via WebdriverIO CLI)