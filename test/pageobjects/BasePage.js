const CommonUtils = require('../utils/CommonUtils')

/**
 * BasePage Class
 * 
 * This is the base page class that contains common functionality
 * shared across all page objects. It provides basic page operations
 * and element interaction methods.
 */
class BasePage {
    
    /**
     * Constructor for BasePage
     */
    constructor() {
        this.pageTitle = ''
        this.url = ''
    }

    /**
     * Navigate to the page URL
     * @param {string} url - URL to navigate to
     */
    async navigateTo(url) {
        try {
            await browser.url(url)
            await CommonUtils.waitForPageLoad()
            console.log(`✅ Navigated to: ${url}`)
        } catch (error) {
            console.error(`❌ Failed to navigate to ${url}: ${error.message}`)
            throw error
        }
    }

    /**
     * Get current page title
     * @returns {string} Current page title
     */
    async getPageTitle() {
        try {
            const title = await browser.getTitle()
            console.log(`📄 Current page title: ${title}`)
            return title
        } catch (error) {
            console.error(`❌ Failed to get page title: ${error.message}`)
            throw error
        }
    }

    /**
     * Get current page URL
     * @returns {string} Current page URL
     */
    async getCurrentUrl() {
        try {
            const url = await browser.getUrl()
            console.log(`🔗 Current URL: ${url}`)
            return url
        } catch (error) {
            console.error(`❌ Failed to get current URL: ${error.message}`)
            throw error
        }
    }

    /**
     * Wait for page to load completely
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForPageLoad(timeout = 30000) {
        await CommonUtils.waitForPageLoad(timeout)
    }

    /**
     * Take screenshot of current page
     * @param {string} name - Screenshot name
     * @returns {string} Screenshot file path
     */
    async takeScreenshot(name) {
        return await CommonUtils.takeScreenshot(name)
    }

    /**
     * Scroll to top of page
     */
    async scrollToTop() {
        try {
            await browser.execute(() => window.scrollTo(0, 0))
            console.log('✅ Scrolled to top of page')
        } catch (error) {
            console.error(`❌ Failed to scroll to top: ${error.message}`)
            throw error
        }
    }

    /**
     * Scroll to bottom of page
     */
    async scrollToBottom() {
        try {
            await browser.execute(() => window.scrollTo(0, document.body.scrollHeight))
            console.log('✅ Scrolled to bottom of page')
        } catch (error) {
            console.error(`❌ Failed to scroll to bottom: ${error.message}`)
            throw error
        }
    }

    /**
     * Refresh the current page
     */
    async refreshPage() {
        try {
            await browser.refresh()
            await this.waitForPageLoad()
            console.log('✅ Page refreshed successfully')
        } catch (error) {
            console.error(`❌ Failed to refresh page: ${error.message}`)
            throw error
        }
    }

    /**
     * Check if element is displayed
     * @param {WebdriverIO.Element} element - Element to check
     * @returns {boolean} True if element is displayed
     */
    async isElementDisplayed(element) {
        try {
            return await element.isDisplayed()
        } catch (error) {
            console.log(`Element not displayed: ${error.message}`)
            return false
        }
    }

    /**
     * Check if element exists
     * @param {WebdriverIO.Element} element - Element to check
     * @returns {boolean} True if element exists
     */
    async isElementExists(element) {
        try {
            return await element.isExisting()
        } catch (error) {
            console.log(`Element does not exist: ${error.message}`)
            return false
        }
    }

    /**
     * Wait for element to be displayed
     * @param {WebdriverIO.Element} element - Element to wait for
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForElementToBeDisplayed(element, timeout = 10000) {
        await CommonUtils.waitForElementToBeDisplayed(element, timeout)
    }

    /**
     * Wait for element to be clickable
     * @param {WebdriverIO.Element} element - Element to wait for
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForElementToBeClickable(element, timeout = 10000) {
        await CommonUtils.waitForElementToBeClickable(element, timeout)
    }

    /**
     * Safe click on element
     * @param {WebdriverIO.Element} element - Element to click
     * @param {number} timeout - Timeout in milliseconds
     */
    async safeClick(element, timeout = 10000) {
        await CommonUtils.safeClick(element, timeout)
    }

    /**
     * Safe input text into element
     * @param {WebdriverIO.Element} element - Element to input text
     * @param {string} text - Text to input
     * @param {number} timeout - Timeout in milliseconds
     */
    async safeInput(element, text, timeout = 10000) {
        await CommonUtils.safeInput(element, text, timeout)
    }

    /**
     * Safe get text from element
     * @param {WebdriverIO.Element} element - Element to get text from
     * @param {number} timeout - Timeout in milliseconds
     * @returns {string} Element text content
     */
    async safeGetText(element, timeout = 10000) {
        return await CommonUtils.safeGetText(element, timeout)
    }

    /**
     * Validate page title
     * @param {string} expectedTitle - Expected page title
     */
    async validatePageTitle(expectedTitle) {
        await CommonUtils.validatePageTitle(expectedTitle)
    }

    /**
     * Validate element text content
     * @param {WebdriverIO.Element} element - Element to validate
     * @param {string} expectedText - Expected text content
     */
    async validateElementText(element, expectedText) {
        await CommonUtils.validateElementText(element, expectedText)
    }
}

module.exports = BasePage
