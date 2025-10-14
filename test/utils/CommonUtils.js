/**
 * CommonUtils Utility Class
 * 
 * This utility class provides common helper methods for automation testing
 * including wait strategies, element interactions, and validation methods.
 */
class CommonUtils {
    
    /**
     * Wait for element to be displayed with custom timeout
     * @param {WebdriverIO.Element} element - WebdriverIO element
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     * @param {string} errorMessage - Custom error message
     * @returns {boolean} True if element is displayed
     */
    static async waitForElementToBeDisplayed(element, timeout = 10000, errorMessage = 'Element not displayed') {
        try {
            await element.waitForDisplayed({ timeout })
            return true
        } catch (error) {
            console.error(`${errorMessage}: ${error.message}`)
            throw new Error(`${errorMessage}: ${error.message}`)
        }
    }

    /**
     * Wait for element to be clickable with custom timeout
     * @param {WebdriverIO.Element} element - WebdriverIO element
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     * @param {string} errorMessage - Custom error message
     * @returns {boolean} True if element is clickable
     */
    static async waitForElementToBeClickable(element, timeout = 10000, errorMessage = 'Element not clickable') {
        try {
            await element.waitForClickable({ timeout })
            return true
        } catch (error) {
            console.error(`${errorMessage}: ${error.message}`)
            throw new Error(`${errorMessage}: ${error.message}`)
        }
    }

    /**
     * Wait for element to exist with custom timeout
     * @param {WebdriverIO.Element} element - WebdriverIO element
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     * @param {string} errorMessage - Custom error message
     * @returns {boolean} True if element exists
     */
    static async waitForElementToExist(element, timeout = 10000, errorMessage = 'Element does not exist') {
        try {
            await element.waitForExist({ timeout })
            return true
        } catch (error) {
            console.error(`${errorMessage}: ${error.message}`)
            throw new Error(`${errorMessage}: ${error.message}`)
        }
    }

    /**
     * Safe click method with wait and error handling
     * @param {WebdriverIO.Element} element - WebdriverIO element
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     * @param {string} errorMessage - Custom error message
     */
    static async safeClick(element, timeout = 10000, errorMessage = 'Failed to click element') {
        try {
            await this.waitForElementToBeClickable(element, timeout)
            await element.click()
            console.log('✅ Element clicked successfully')
        } catch (error) {
            console.error(`${errorMessage}: ${error.message}`)
            throw new Error(`${errorMessage}: ${error.message}`)
        }
    }

    /**
     * Safe input method with wait and error handling
     * @param {WebdriverIO.Element} element - WebdriverIO element
     * @param {string} text - Text to input
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     * @param {string} errorMessage - Custom error message
     */
    static async safeInput(element, text, timeout = 10000, errorMessage = 'Failed to input text') {
        try {
            await this.waitForElementToBeDisplayed(element, timeout)
            await element.clearValue()
            await element.setValue(text)
            console.log(`✅ Text input successfully: ${text}`)
        } catch (error) {
            console.error(`${errorMessage}: ${error.message}`)
            throw new Error(`${errorMessage}: ${error.message}`)
        }
    }

    /**
     * Safe get text method with wait and error handling
     * @param {WebdriverIO.Element} element - WebdriverIO element
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     * @param {string} errorMessage - Custom error message
     * @returns {string} Element text content
     */
    static async safeGetText(element, timeout = 10000, errorMessage = 'Failed to get element text') {
        try {
            await this.waitForElementToBeDisplayed(element, timeout)
            const text = await element.getText()
            console.log(`✅ Element text retrieved: ${text}`)
            return text
        } catch (error) {
            console.error(`${errorMessage}: ${error.message}`)
            throw new Error(`${errorMessage}: ${error.message}`)
        }
    }

    /**
     * Wait for page to load completely
     * @param {number} timeout - Timeout in milliseconds (default: 30000)
     */
    static async waitForPageLoad(timeout = 30000) {
        try {
            await browser.waitUntil(
                async () => {
                    const readyState = await browser.execute(() => document.readyState)
                    return readyState === 'complete'
                },
                {
                    timeout,
                    timeoutMsg: 'Page did not load completely'
                }
            )
            console.log('✅ Page loaded completely')
        } catch (error) {
            console.error(`❌ Page load timeout: ${error.message}`)
            throw error
        }
    }

    /**
     * Scroll element into view
     * @param {WebdriverIO.Element} element - WebdriverIO element
     */
    static async scrollIntoView(element) {
        try {
            await element.scrollIntoView()
            console.log('✅ Element scrolled into view')
        } catch (error) {
            console.error(`❌ Failed to scroll element into view: ${error.message}`)
            throw error
        }
    }

    /**
     * Take screenshot with timestamp
     * @param {string} name - Screenshot name
     * @returns {string} Screenshot file path
     */
    static async takeScreenshot(name) {
        try {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
            const screenshotName = `${name}-${timestamp}.png`
            const screenshotPath = `./screenshots/${screenshotName}`
            await browser.saveScreenshot(screenshotPath)
            console.log(`📸 Screenshot saved: ${screenshotName}`)
            return screenshotPath
        } catch (error) {
            console.error(`❌ Failed to take screenshot: ${error.message}`)
            throw error
        }
    }

    /**
     * Validate page title
     * @param {string} expectedTitle - Expected page title
     * @param {string} errorMessage - Custom error message
     */
    static async validatePageTitle(expectedTitle, errorMessage = 'Page title validation failed') {
        try {
            const actualTitle = await browser.getTitle()
            if (actualTitle !== expectedTitle) {
                throw new Error(`Expected title: "${expectedTitle}", but got: "${actualTitle}"`)
            }
            console.log(`✅ Page title validation passed: ${actualTitle}`)
        } catch (error) {
            console.error(`${errorMessage}: ${error.message}`)
            throw new Error(`${errorMessage}: ${error.message}`)
        }
    }

    /**
     * Validate element text content
     * @param {WebdriverIO.Element} element - WebdriverIO element
     * @param {string} expectedText - Expected text content
     * @param {string} errorMessage - Custom error message
     */
    static async validateElementText(element, expectedText, errorMessage = 'Element text validation failed') {
        try {
            const actualText = await this.safeGetText(element)
            if (!actualText.includes(expectedText)) {
                throw new Error(`Expected text to contain: "${expectedText}", but got: "${actualText}"`)
            }
            console.log(`✅ Element text validation passed: ${actualText}`)
        } catch (error) {
            console.error(`${errorMessage}: ${error.message}`)
            throw new Error(`${errorMessage}: ${error.message}`)
        }
    }

    /**
     * Wait for URL to contain specific text
     * @param {string} urlText - Text that should be in URL
     * @param {number} timeout - Timeout in milliseconds (default: 10000)
     */
    static async waitForUrlToContain(urlText, timeout = 10000) {
        try {
            await browser.waitUntil(
                async () => {
                    const currentUrl = await browser.getUrl()
                    return currentUrl.includes(urlText)
                },
                {
                    timeout,
                    timeoutMsg: `URL did not contain "${urlText}" within ${timeout}ms`
                }
            )
            console.log(`✅ URL contains expected text: ${urlText}`)
        } catch (error) {
            console.error(`❌ URL validation failed: ${error.message}`)
            throw error
        }
    }

    /**
     * Generate random string for test data
     * @param {number} length - Length of random string
     * @returns {string} Random string
     */
    static generateRandomString(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let result = ''
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return result
    }

    /**
     * Generate random email for testing
     * @returns {string} Random email address
     */
    static generateRandomEmail() {
        const randomString = this.generateRandomString(8)
        return `test-${randomString}@example.com`
    }
}

module.exports = CommonUtils
