const { join } = require('path')
const { ReportGenerator, HtmlReporter } = require('wdio-html-nice-reporter')

// Global variable for report aggregator
let reportAggregator

/**
 * WebdriverIO Configuration for PHTN.ai Automation Framework
 * 
 * This configuration includes:
 * - Chrome browser setup
 * - Screenshot capture on failure
 * - Allure reporting
 * - Test grouping (critical, smoke, regression)
 * - Page Object Model support
 * - Explicit waits configuration
 */
exports.config = {
    // Test runner configuration
    runner: 'local',
    
    // Define suites to enable --suite flag (e.g., critical/smoke/regression)
    suites: {
        critical: [
            './test/specs/HomePageTests.js',
            './test/specs/AboutPageTests.js'
        ],
        smoke: [
            './test/specs/**/*.js'
        ],
        regression: [
            './test/specs/**/*.js'
        ]
    },
    
    // Test specs
    specs: [
        './test/specs/**/*.js'
    ],
    
    // Exclude patterns
    exclude: [
        './test/specs/example/**/*.js'
    ],
    
    // Maximum number of total parallel workers
    maxInstances: 1,
    
    // Capabilities for Chrome browser
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--window-size=1920,1080'
            ]
        }
    }],
    
    // Test execution settings
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://48997458.hs-sites.com',
    
    // Wait timeout settings
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    
    // Services
    services: [
        ['devtools']
    ],
    
    // Framework configuration
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: process.cwd() + '/allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false
        }],
        ['html-nice', {
            outputDir: './reports/html-reports/',
            filename: 'report.html',
            reportTitle: 'PHTN.ai Test Report',
            linkScreenshots: true,
            showInBrowser: true,
            collapseTests: false,
            useOnAfterCommandForScreenshot: false
        }]
    ],
    
    // Mocha options
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        grep: process.env.SUITE || ''
    },
    
    // Screenshot configuration
    screenshotPath: './screenshots/',
    screenshotOnReject: true,
    
    // Report paths - using absolute paths to handle spaces
    reportPath: process.cwd() + '/allure-results',
    reportOutputPath: process.cwd() + '/allure-report',
    
    // Hooks
    onPrepare: function (config, capabilities) {
        reportAggregator = new ReportGenerator({
            outputDir: './reports/html-reports/',
            filename: 'master-report.html',
            reportTitle: 'PHTN.ai Master Test Report',
            browserName: capabilities[0].browserName || 'chrome',
            collapseTests: true
        })
        reportAggregator.clean()
    },

    before: function (capabilities, specs) {
        // Load environment variables
        require('dotenv').config()
        
        // Set implicit wait
        browser.setTimeout({ implicit: 10000 })
        
        // Set window size
        browser.setWindowSize(1920, 1080)
        
        console.log('🚀 Starting PHTN.ai Automation Tests')
        console.log(`📋 Test Suite: ${specs}`)
    },
    
    beforeTest: function (test, context) {
        console.log(`🧪 Running Test: ${test.title}`)
    },
    
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            // Capture screenshot on failure
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
            const screenshotName = `failure-${test.title.replace(/\s+/g, '-')}-${timestamp}.png`
            browser.saveScreenshot(`./screenshots/${screenshotName}`)
            console.log(`📸 Screenshot saved: ${screenshotName}`)
        }
    },
    
    after: function (result, capabilities, specs) {
        console.log('✅ Test execution completed')
        console.log(`📊 Total specs: ${specs.length}`)
    },

    onComplete: function (exitCode, config, capabilities, results) {
        (async () => {
            try {
                if (reportAggregator && typeof reportAggregator.createReport === 'function') {
                    await reportAggregator.createReport()
                    console.log('📊 Master HTML report generated successfully')
                } else {
                    console.log('📊 HTML reports generated successfully in individual folders')
                }
            } catch (error) {
                console.error('❌ Error generating master HTML report:', error)
            }
        })()
        console.log('📊 Test execution completed - Allure reports available in allure-results/')
    },
    
    // Page Object Model support
    pageObjects: [
        './test/pageobjects/**/*.js'
    ]
}
