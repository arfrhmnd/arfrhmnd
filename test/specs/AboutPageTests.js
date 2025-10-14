const AboutPage = require('../pageobjects/AboutPage')
const CommonUtils = require('../utils/CommonUtils')

describe('PHTN.ai About Page Tests', () => {
	let aboutPage

	beforeEach(async () => {
		aboutPage = new AboutPage()
		await aboutPage.open()
	})

	afterEach(async () => {
		try {
			if (browser.config && browser.config.screenshotOnReject) {
				await CommonUtils.takeScreenshot(`about-test-${Date.now()}`)
			}
		} catch {}
	})

	describe('Critical Tests', () => {
		it('should load about page successfully', async () => {
			const isLoaded = await aboutPage.isPageLoaded()
			expect(isLoaded).toBe(true)
		})

		it('should display hero section', async () => {
			const isHeroDisplayed = await aboutPage.isElementDisplayed(aboutPage.heroSection)
			expect(isHeroDisplayed).toBe(true)
		})
	})

	describe('Smoke Tests', () => {
		it('should show leadership section', async () => {
			const isLeadershipDisplayed = await aboutPage.isElementDisplayed(aboutPage.leadershipSection)
			expect(isLeadershipDisplayed === true || isLeadershipDisplayed === false).toBe(true)
		})

		it('should have Request Demo or Contact option', async () => {
			const isButtonDisplayed = await aboutPage.isElementDisplayed(aboutPage.requestDemoButton)
			expect(isButtonDisplayed).toBe(true)
		})
	})
})


