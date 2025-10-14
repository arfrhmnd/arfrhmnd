# PHTN.ai Automation Framework

Framework automation testing untuk website PHTN.ai menggunakan WebdriverIO dengan best practices dan arsitektur yang scalable.

## 🚀 Fitur Utama

- **WebdriverIO** dengan TypeScript support
- **Page Object Model** untuk maintainability
- **Test Data Management** dengan JSON files
- **Screenshot & Logging** otomatis pada failure
- **Allure Reporting** untuk test results
- **Test Grouping** (Critical, Smoke, Regression)
- **Explicit Waits** untuk stability
- **Clean Code Practices** dengan proper documentation

## 📁 Struktur Project

```
Automation 1/
├── test/
│   ├── specs/                 # Test cases
│   │   ├── HomePageTests.js   # Homepage test suite
│   │   └── PerformanceTests.js # Performance test suite
│   ├── pageobjects/           # Page Object Model
│   │   ├── BasePage.js        # Base page class
│   │   └── HomePage.js        # Homepage page object
│   ├── utils/                 # Utility functions
│   │   ├── CommonUtils.js     # Common utilities
│   │   └── TestDataLoader.js  # Test data loader
│   └── data/                  # Test data
│       └── testData.json      # Test data & credentials
├── logs/                      # Test execution logs
├── screenshots/               # Screenshots on failure
├── allure-results/           # Allure test results
├── allure-report/            # Allure HTML report
├── package.json              # Dependencies
├── wdio.conf.js              # WebdriverIO configuration
└── README.md                 # Documentation
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js (v16 atau lebih tinggi)
- npm atau yarn
- Chrome browser

### Installation

1. **Clone atau download project**
   ```bash
   cd "/Users/rifqi_f/Documents/Automation/Automation 1"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env file sesuai kebutuhan
   ```

4. **Install Selenium Standalone**
   ```bash
   npx selenium-standalone install
   ```

## 🧪 Menjalankan Tests

### Menjalankan Semua Tests
```bash
npm test
```

### Menjalankan Test Groups

#### Critical Tests (High Priority)
```bash
npm run test:critical
```

#### Smoke Tests (Medium Priority)
```bash
npm run test:smoke
```

#### Regression Tests (Full Suite)
```bash
npm run test:regression
```

#### Headless Mode
```bash
npm run test:headless
```

### Menjalankan Specific Test
```bash
npx wdio run wdio.conf.js --spec ./test/specs/HomePageTests.js
```

## 📊 Reporting

### Allure Reports
```bash
# Generate dan buka Allure report
npm run report
```

### HTML Reports
Framework dilengkapi dengan HTML reporter untuk quick overview:

```bash
# Buka individual HTML report
npm run report:html

# Buka master HTML report (aggregated)
npm run report:html:master
```

### Report Features
- **Allure**: Detailed analysis, trending, dan comprehensive reporting
- **HTML**: Quick overview, visual appeal, dan easy sharing
- **Master Aggregation**: Semua test suite dalam satu laporan HTML
- **Screenshot Integration**: Screenshot otomatis untuk failed tests

### Screenshots
- Screenshots otomatis diambil pada setiap test failure
- Disimpan di folder `screenshots/`
- Format: `failure-{test-name}-{timestamp}.png`

### Logs
- Test execution logs disimpan di folder `logs/`
- Console output untuk debugging

## 🏗️ Arsitektur Framework

### Page Object Model

#### BasePage.js
Base class yang berisi common functionality:
- Navigation methods
- Element interaction methods
- Wait strategies
- Screenshot capabilities

#### HomePage.js
Homepage-specific page object:
- Homepage elements
- Homepage-specific methods
- Content validation methods

### Test Data Management

#### testData.json
Centralized test data storage:
```json
{
  "urls": {
    "baseUrl": "http://48997458.hs-sites.com",
    "homepage": "http://48997458.hs-sites.com/phtn.ai-homepage"
  },
  "credentials": {
    "validUser": {
      "username": "testuser@example.com",
      "password": "TestPassword123!"
    }
  },
  "testData": {
    "pageTitles": {
      "homepage": "PHTN.ai - Enterprise AI Solutions"
    }
  }
}
```

### Utility Classes

#### CommonUtils.js
Common helper methods:
- Wait strategies
- Element interactions
- Screenshot capture
- Validation methods

#### TestDataLoader.js
Test data access methods:
- URL management
- Credential management
- Test data retrieval

## 🧪 Test Cases

### Critical Tests
- ✅ Homepage loads successfully
- ✅ Logo is displayed
- ✅ Navigation menu is present
- ✅ Hero section content

### Smoke Tests
- ✅ All main sections present
- ✅ Footer with links
- ✅ Page load performance

### Regression Tests
- ✅ Navigation functionality
- ✅ Request Demo button
- ✅ Newsletter signup form
- ✅ Responsive design
- ✅ Page scrolling
- ✅ Page refresh

### Performance Tests
- ✅ Load time validation
- ✅ Responsive design testing
- ✅ Resource optimization
- ✅ Stress testing

## 🔧 Configuration

### WebdriverIO Configuration (wdio.conf.js)

```javascript
// Browser configuration
capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
        args: ['--no-sandbox', '--disable-dev-shm-usage']
    }
}]

// Screenshot configuration
screenshotPath: './screenshots/',
screenshotOnReject: true

// Reporting configuration
reporters: [
    'spec',
    ['allure', {
        outputDir: '/Users/arief_r/Downloads/Automation\ 1/allure-report'
'
    }]
]
```

### Environment Variables (.env)

```bash
BASE_URL=http://48997458.hs-sites.com
BROWSER=chrome
HEADLESS=false
DEFAULT_TIMEOUT=10000
SCREENSHOT_ON_FAILURE=true
```

## 📝 Best Practices

### 1. Test Data Management
- ✅ No hardcoded values
- ✅ Centralized test data
- ✅ Environment-specific configuration

### 2. Wait Strategies
- ✅ Explicit waits instead of Thread.sleep()
- ✅ Custom timeout values
- ✅ Wait for specific conditions

### 3. Error Handling
- ✅ Screenshot on failure
- ✅ Detailed error messages
- ✅ Graceful error handling

### 4. Code Quality
- ✅ Clean code practices
- ✅ Proper naming conventions
- ✅ Comprehensive documentation
- ✅ No code duplication

### 5. Test Organization
- ✅ Logical test grouping
- ✅ Descriptive test names
- ✅ Proper assertions
- ✅ Test independence

## 🐛 Troubleshooting

### Common Issues

#### 1. Chrome Driver Issues
```bash
# Update Chrome driver
npx selenium-standalone install --drivers.chrome.version=119.0.6045.105
```

#### 2. Permission Issues
```bash
# Fix permissions
chmod +x node_modules/.bin/wdio
```

#### 3. Port Conflicts
```bash
# Kill existing processes
pkill -f selenium
pkill -f chrome
```

### Debug Mode
```bash
# Run with debug logs
DEBUG=* npm test
```

## 📈 CI/CD Integration

### GitHub Actions Example
```yaml
name: Automation Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm test
      - uses: actions/upload-artifact@v2
        with:
          name: allure-results
          path: allure-results/
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Write tests for new features
4. Ensure all tests pass
5. Submit pull request

## 📞 Support

Untuk pertanyaan atau issues:
- Create issue di repository
- Contact automation team
- Check documentation

## 📄 License

MIT License - lihat file LICENSE untuk detail.

---

**Framework ini dibuat dengan ❤️ untuk PHTN.ai automation testing**
