const BasePage = require('./BasePage')

class AboutPage extends BasePage {

	constructor() {
		super()
		this.url = 'http://48997458.hs-sites.com/phtn.ai-about'
		this.pageTitle = 'PHTN.ai - About Us'
	}

	get navigationMenu() {
		return $(`//button[contains(translate(@aria-label,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'menu') or
			contains(translate(@class,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'hamburger') or
			contains(translate(@class,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'menu')]
			| //*[@role='navigation']
			| //nav`)
	}

	get heroSection() {
		return $('.hero, [class*="hero"], [class*="banner"]')
	}

	get leadershipSection() {
		return $('*=leadership team, h2*=leadership, [id*="leadership" i]')
	}

	get requestDemoButton() {
		return $(
			`//a[
				contains(translate(normalize-space(.),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'request') or
				contains(translate(normalize-space(.),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'demo') or
				contains(@href,'demo') or contains(@href,'request') or contains(@href,'contact')
			]
			| //button[
				contains(translate(normalize-space(.),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'request') or
				contains(translate(normalize-space(.),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'demo') or
				contains(translate(@class,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'demo') or
				contains(translate(@class,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'request')
			]`
		)
	}

	async open() {
		await this.navigateTo(this.url)
		await this.waitForPageLoad()
	}

	async isPageLoaded() {
		try {
			await this.waitForElementToBeDisplayed(this.heroSection, 10000)
			const title = await this.getPageTitle()
			return Boolean(title)
		} catch (error) {
			return false
		}
	}
}

module.exports = AboutPage


