/**
 * Test Configuration
 * 
 * Centralized configuration for test execution
 * including timeouts, retries, and test data paths
 */
const path = require('path')

const testConfig = {
    // Test execution settings
    execution: {
        defaultTimeout: 10000,
        implicitWait: 10000,
        pageLoadTimeout: 30000,
        retryCount: 2,
        retryDelay: 1000
    },
    
    // Browser settings
    browser: {
        name: 'chrome',
        headless: false,
        windowSize: {
            width: 1920,
            height: 1080
        },
        args: [
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--window-size=1920,1080'
        ]
    },
    
    // Test data paths
    paths: {
        testData: path.join(__dirname, '../data/testData.json'),
        screenshots: path.join(__dirname, '../../screenshots'),
        logs: path.join(__dirname, '../../logs'),
        allureResults: path.join(__dirname, '../../allure-results'),
        allureReport: path.join(__dirname, '../../allure-report')
    },
    
    // Test suites configuration
    suites: {
        critical: {
            description: 'Critical functionality tests',
            timeout: 15000,
            retryCount: 2
        },
        smoke: {
            description: 'Smoke tests for basic functionality',
            timeout: 10000,
            retryCount: 2
        },
        regression: {
            description: 'Full regression test suite',
            timeout: 30000,
            retryCount: 1
        },
        performance: {
            description: 'Performance and load tests',
            timeout: 60000,
            retryCount: 1
        }
    },
    
    // Reporting settings
    reporting: {
        screenshotOnFailure: true,
        videoRecording: false,
        consoleLogs: true,
        allureReport: true
    },
    
    // Environment settings
    environment: {
        baseUrl: 'http://48997458.hs-sites.com',
        homepageUrl: 'http://48997458.hs-sites.com/phtn.ai-homepage',
        apiUrl: 'http://48997458.hs-sites.com/api'
    }
}

module.exports = testConfig
