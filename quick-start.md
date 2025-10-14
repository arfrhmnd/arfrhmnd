# 🚀 Quick Start Guide - PHTN.ai Automation Framework

## ⚡ Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
cd "/Users/rifqi_f/Documents/Automation/Automation 1"
npm install
```

### 2. Install Selenium
```bash
npx selenium-standalone install
```

### 3. Run Tests
```bash
# Run all tests
npm test

# Run critical tests only
npm run test:critical

# Run with report
npm run report
```

## 🎯 Test Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:critical` | Run critical tests only |
| `npm run test:smoke` | Run smoke tests only |
| `npm run test:regression` | Run regression tests |
| `npm run test:headless` | Run tests in headless mode |
| `npm run report` | Generate and open Allure report |

## 🔧 Using the Test Runner Script

```bash
# Make script executable
chmod +x run-tests.sh

# Run critical tests
./run-tests.sh --suite critical

# Run specific test file
./run-tests.sh --test HomePageTests.js

# Run with report
./run-tests.sh --report

# Clean and run
./run-tests.sh --clean --suite smoke
```

## 📊 Viewing Results

### Screenshots
- Location: `screenshots/`
- Format: `failure-{test-name}-{timestamp}.png`

### Allure Report
```bash
npm run report
```
- Opens in browser automatically
- Shows test results, trends, and screenshots

### Logs
- Location: `logs/`
- Console output for debugging

## 🐛 Troubleshooting

### Common Issues

1. **Chrome Driver Issues**
   ```bash
   npx selenium-standalone install --drivers.chrome.version=119.0.6045.105
   ```

2. **Permission Issues**
   ```bash
   chmod +x run-tests.sh
   chmod +x node_modules/.bin/wdio
   ```

3. **Port Conflicts**
   ```bash
   pkill -f selenium
   pkill -f chrome
   ```

### Debug Mode
```bash
DEBUG=* npm test
```

## 📝 Test Structure

```
test/
├── specs/           # Test cases
│   ├── HomePageTests.js
│   └── PerformanceTests.js
├── pageobjects/     # Page Object Model
│   ├── BasePage.js
│   └── HomePage.js
├── utils/           # Utilities
│   ├── CommonUtils.js
│   └── TestDataLoader.js
└── data/            # Test data
    └── testData.json
```

## 🎯 Test Groups

- **Critical**: Essential functionality (High Priority)
- **Smoke**: Basic functionality (Medium Priority)  
- **Regression**: Full test suite (Low Priority)
- **Performance**: Load and performance tests

## 📈 CI/CD Integration

The framework includes GitHub Actions workflow:
- Runs on push/PR to main/develop branches
- Daily scheduled runs
- Matrix strategy for different test suites
- Artifact upload for results

## 🆘 Need Help?

1. Check the main README.md for detailed documentation
2. Review test logs in `logs/` folder
3. Check screenshots in `screenshots/` folder
4. Run with debug mode: `DEBUG=* npm test`

---

**Happy Testing! 🧪✨**
