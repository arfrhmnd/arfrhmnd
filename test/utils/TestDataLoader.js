const fs = require('fs')
const path = require('path')

/**
 * TestDataLoader Utility Class
 * 
 * This utility class handles loading test data from JSON files
 * and provides methods to access different types of test data
 * without hardcoding values in test cases.
 */
class TestDataLoader {
    constructor() {
        this.testData = null
        this.loadTestData()
    }

    /**
     * Load test data from JSON file
     * @private
     */
    loadTestData() {
        try {
            const dataPath = path.join(__dirname, '../data/testData.json')
            const rawData = fs.readFileSync(dataPath, 'utf8')
            this.testData = JSON.parse(rawData)
            console.log('✅ Test data loaded successfully')
        } catch (error) {
            console.error('❌ Error loading test data:', error.message)
            throw new Error(`Failed to load test data: ${error.message}`)
        }
    }

    /**
     * Get URL data
     * @param {string} urlKey - Key for the URL (e.g., 'baseUrl', 'homepage')
     * @returns {string} URL string
     */
    getUrl(urlKey) {
        if (!this.testData?.urls?.[urlKey]) {
            throw new Error(`URL key '${urlKey}' not found in test data`)
        }
        return this.testData.urls[urlKey]
    }

    /**
     * Get credentials data
     * @param {string} credentialType - Type of credentials ('validUser', 'invalidUser')
     * @returns {object} Credentials object with username and password
     */
    getCredentials(credentialType) {
        if (!this.testData?.credentials?.[credentialType]) {
            throw new Error(`Credential type '${credentialType}' not found in test data`)
        }
        return this.testData.credentials[credentialType]
    }

    /**
     * Get page title data
     * @param {string} pageKey - Key for the page title
     * @returns {string} Expected page title
     */
    getPageTitle(pageKey) {
        if (!this.testData?.testData?.pageTitles?.[pageKey]) {
            throw new Error(`Page title key '${pageKey}' not found in test data`)
        }
        return this.testData.testData.pageTitles[pageKey]
    }

    /**
     * Get expected text content
     * @param {string} textKey - Key for the expected text
     * @returns {string} Expected text content
     */
    getExpectedText(textKey) {
        if (!this.testData?.testData?.expectedTexts?.[textKey]) {
            throw new Error(`Expected text key '${textKey}' not found in test data`)
        }
        return this.testData.testData.expectedTexts[textKey]
    }

    /**
     * Get navigation menu items
     * @returns {array} Array of navigation menu items
     */
    getNavigationMenuItems() {
        if (!this.testData?.testData?.navigation?.menuItems) {
            throw new Error('Navigation menu items not found in test data')
        }
        return this.testData.testData.navigation.menuItems
    }

    /**
     * Get form test data
     * @param {string} formType - Type of form ('newsletter', 'contact')
     * @param {string} fieldKey - Specific field key
     * @returns {string|object} Form data
     */
    getFormData(formType, fieldKey = null) {
        if (!this.testData?.testData?.forms?.[formType]) {
            throw new Error(`Form type '${formType}' not found in test data`)
        }
        
        if (fieldKey) {
            if (!this.testData.testData.forms[formType][fieldKey]) {
                throw new Error(`Field key '${fieldKey}' not found in form '${formType}'`)
            }
            return this.testData.testData.forms[formType][fieldKey]
        }
        
        return this.testData.testData.forms[formType]
    }

    /**
     * Get timeout values
     * @param {string} timeoutType - Type of timeout ('short', 'medium', 'long')
     * @returns {number} Timeout value in milliseconds
     */
    getTimeout(timeoutType) {
        if (!this.testData?.timeouts?.[timeoutType]) {
            throw new Error(`Timeout type '${timeoutType}' not found in test data`)
        }
        return this.testData.timeouts[timeoutType]
    }

    /**
     * Get all test data
     * @returns {object} Complete test data object
     */
    getAllTestData() {
        return this.testData
    }
}

module.exports = new TestDataLoader()
