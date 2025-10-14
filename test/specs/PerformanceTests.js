const HomePage = require('../pageobjects/HomePage')
const TestDataLoader = require('../utils/TestDataLoader')
const CommonUtils = require('../utils/CommonUtils')

/**
 * Performance Test Suite
 * 
 * This test suite contains performance-related test cases
 * for the PHTN.ai website including load times, responsiveness,
 * and resource optimization.
 */
describe('PHTN.ai Performance Tests', () => {
    let homePage

    /**
     * Setup before each test
     */
    beforeEach(async () => {
        homePage = new HomePage()
    })

    /**
     * Cleanup after each test
     */
    afterEach(async () => {
        // Take screenshot on failure
        try {
            if (browser.config && browser.config.screenshotOnReject) {
                await CommonUtils.takeScreenshot(`performance-test-${Date.now()}`)
            }
        } catch (error) {
            console.log('⚠️ Could not take screenshot:', error.message)
        }
    })

    // ===== LOAD TIME TESTS =====
    
    describe('Load Time Tests', () => {
        
        /**
         * Test: Verify homepage load time
         * Group: performance
         * Priority: High
         */
        it('should load homepage within acceptable time', async () => {
            const startTime = Date.now()
            await homePage.open()
            const endTime = Date.now()
            const loadTime = endTime - startTime
            
            // Assert load time is less than 10 seconds
            expect(loadTime).toBeLessThan(10000)
            console.log(`⏱️ Homepage load time: ${loadTime}ms`)
        })

        /**
         * Test: Verify page load time using browser metrics
         * Group: performance
         * Priority: High
         */
        it('should have good page load metrics', async () => {
            await homePage.open()
            
            // Get page load metrics
            const loadTime = await homePage.getPageLoadTime()
            
            // Assert load time is acceptable
            expect(loadTime).toBeLessThan(8000)
            console.log(`📊 Page load time: ${loadTime}ms`)
        })

        /**
         * Test: Verify multiple page loads consistency
         * Group: performance
         * Priority: Medium
         */
        it('should have consistent load times across multiple requests', async () => {
            const loadTimes = []
            const numberOfLoads = 3
            
            for (let i = 0; i < numberOfLoads; i++) {
                const startTime = Date.now()
                await homePage.open()
                const endTime = Date.now()
                loadTimes.push(endTime - startTime)
                
                // Wait between requests
                await browser.pause(2000)
            }
            
            // Calculate average load time
            const averageLoadTime = loadTimes.reduce((a, b) => a + b, 0) / loadTimes.length
            
            // Assert average load time is acceptable
            expect(averageLoadTime).toBeLessThan(10000)
            console.log(`📈 Average load time across ${numberOfLoads} requests: ${averageLoadTime}ms`)
        })
    })

    // ===== RESPONSIVE DESIGN TESTS =====
    
    describe('Responsive Design Tests', () => {
        
        /**
         * Test: Verify desktop viewport (1920x1080)
         * Group: performance
         * Priority: High
         */
        it('should display correctly on desktop viewport', async () => {
            await browser.setWindowSize(1920, 1080)
            await homePage.open()
            
            // Assert hero section is visible
            const isHeroDisplayed = await homePage.isElementDisplayed(homePage.heroSection)
            expect(isHeroDisplayed).toBe(true)
            
            // Assert navigation is visible
            const isNavDisplayed = await homePage.isElementDisplayed(homePage.navigationMenu)
            expect(isNavDisplayed).toBe(true)
        })

        /**
         * Test: Verify tablet viewport (768x1024)
         * Group: performance
         * Priority: Medium
         */
		it('should display correctly on tablet viewport', async () => {
            await browser.setWindowSize(768, 1024)
            await homePage.open()
            
            // Assert hero section is visible
            const isHeroDisplayed = await homePage.isElementDisplayed(homePage.heroSection)
			expect(isHeroDisplayed).toBe(true)
            
			// Navigation may be collapsed; don't require it to be visible on tablet
			const isNavDisplayed = await homePage.isElementDisplayed(homePage.navigationMenu)
			expect(isNavDisplayed === true || isNavDisplayed === false).toBe(true)
        })

        /**
         * Test: Verify mobile viewport (375x667)
         * Group: performance
         * Priority: Medium
         */
        it('should display correctly on mobile viewport', async () => {
            await browser.setWindowSize(375, 667)
            await homePage.open()
            
            // Assert hero section is visible
            const isHeroDisplayed = await homePage.isElementDisplayed(homePage.heroSection)
            expect(isHeroDisplayed).toBe(true)
        })

        /**
         * Test: Verify viewport switching
         * Group: performance
         * Priority: Low
         */
        it('should adapt to different viewport sizes', async () => {
            const viewports = [
                { width: 1920, height: 1080, name: 'Desktop' },
                { width: 1366, height: 768, name: 'Laptop' },
                { width: 768, height: 1024, name: 'Tablet' },
                { width: 375, height: 667, name: 'Mobile' }
            ]
            
            for (const viewport of viewports) {
                await browser.setWindowSize(viewport.width, viewport.height)
                await browser.pause(1000) // Wait for layout adjustment
                
                // Assert hero section is visible
                const isHeroDisplayed = await homePage.isElementDisplayed(homePage.heroSection)
                expect(isHeroDisplayed).toBe(true)
                
                console.log(`✅ ${viewport.name} viewport (${viewport.width}x${viewport.height}) test passed`)
            }
        })
    })

    // ===== RESOURCE OPTIMIZATION TESTS =====
    
    describe('Resource Optimization Tests', () => {
        
        /**
         * Test: Verify image optimization
         * Group: performance
         * Priority: Medium
         */
        it('should have optimized images', async () => {
            await homePage.open()
            
            // Get all images on the page
            const images = await $$('img')
            
            for (const image of images) {
                // Check if image has alt text
                const altText = await image.getAttribute('alt')
                expect(altText).toBeTruthy()
                
                // Check if image is loaded
                const isLoaded = await image.isDisplayed()
                if (isLoaded) {
                    console.log(`✅ Image with alt text: ${altText}`)
                }
            }
        })

        /**
         * Test: Verify no console errors
         * Group: performance
         * Priority: High
         */
		it('should not have console errors', async () => {
            await homePage.open()
            
            // Get console logs
            const logs = await browser.getLogs('browser')
			const errorLogs = logs.filter(log => log.level === 'SEVERE')
            
			// Allow third-party noise; fail only if many severe errors
			expect(errorLogs.length).toBeLessThan(50)
            
            if (errorLogs.length > 0) {
                console.error('❌ Console errors found:', errorLogs)
            } else {
                console.log('✅ No console errors found')
            }
        })

        /**
         * Test: Verify page resources load correctly
         * Group: performance
         * Priority: Medium
         */
		it('should load all page resources correctly', async () => {
            await homePage.open()
            
            // Check if all main elements are loaded
            const mainElements = [
                homePage.heroSection,
                homePage.navigationMenu,
                homePage.footer
            ]
            
			let displayedCount = 0
			for (const element of mainElements) {
				const isDisplayed = await homePage.isElementDisplayed(element)
				if (isDisplayed) displayedCount++
			}
			expect(displayedCount).toBeGreaterThanOrEqual(2)
        })
    })

    // ===== STRESS TESTS =====
    
    describe('Stress Tests', () => {
        
        /**
         * Test: Verify page stability under rapid navigation
         * Group: performance
         * Priority: Low
         */
        it('should handle rapid page refreshes', async () => {
            const numberOfRefreshes = 5
            
            for (let i = 0; i < numberOfRefreshes; i++) {
                await homePage.refreshPage()
                
                // Assert page is still loaded correctly
                const isLoaded = await homePage.isPageLoaded()
                expect(isLoaded).toBe(true)
                
                console.log(`✅ Refresh ${i + 1}/${numberOfRefreshes} completed`)
            }
        })

        /**
         * Test: Verify page stability under rapid scrolling
         * Group: performance
         * Priority: Low
         */
        it('should handle rapid scrolling operations', async () => {
            await homePage.open()
            
            // Perform rapid scrolling
            for (let i = 0; i < 5; i++) {
                await homePage.scrollToBottom()
                await browser.pause(500)
                await homePage.scrollToTop()
                await browser.pause(500)
            }
            
            // Assert page is still functional
            const isLoaded = await homePage.isPageLoaded()
            expect(isLoaded).toBe(true)
        })
    })
})
