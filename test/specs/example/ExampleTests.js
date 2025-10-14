/**
 * Example Test Suite
 * 
 * This is an example test suite to demonstrate the framework structure.
 * You can use this as a template for creating new test suites.
 * 
 * To run this example:
 * npx wdio run wdio.conf.js --spec ./test/specs/example/ExampleTests.js
 */

describe('Example Test Suite', () => {
    
    /**
     * Setup before each test
     */
    beforeEach(async () => {
        // Setup code here
        console.log('🧪 Setting up test...')
    })

    /**
     * Cleanup after each test
     */
    afterEach(async () => {
        // Cleanup code here
        console.log('🧹 Cleaning up test...')
    })

    /**
     * Example test case
     * Group: example
     * Priority: Low
     */
    it('should demonstrate basic test structure', async () => {
        // Navigate to a page
        await browser.url('https://example.com')
        
        // Wait for page to load
        await browser.waitUntil(
            async () => {
                const title = await browser.getTitle()
                return title.includes('Example')
            },
            {
                timeout: 10000,
                timeoutMsg: 'Page did not load within 10 seconds'
            }
        )
        
        // Assert page title
        const title = await browser.getTitle()
        expect(title).toContain('Example')
        
        console.log('✅ Example test passed')
    })

    /**
     * Example test with Page Object Model
     * Group: example
     * Priority: Low
     */
    it('should demonstrate Page Object Model usage', async () => {
        // This is just an example - replace with actual page object
        await browser.url('https://example.com')
        
        // Example of element interaction
        const body = await $('body')
        const isDisplayed = await body.isDisplayed()
        expect(isDisplayed).toBe(true)
        
        console.log('✅ Page Object Model example passed')
    })

    /**
     * Example test with test data
     * Group: example
     * Priority: Low
     */
    it('should demonstrate test data usage', async () => {
        // Example test data
        const testData = {
            url: 'https://example.com',
            expectedTitle: 'Example Domain'
        }
        
        await browser.url(testData.url)
        
        const title = await browser.getTitle()
        expect(title).toContain(testData.expectedTitle)
        
        console.log('✅ Test data example passed')
    })
})
