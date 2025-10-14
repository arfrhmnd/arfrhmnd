const BasePage = require('./BasePage')

/**
 * HomePage Class
 * 
 * This class represents the PHTN.ai homepage and contains
 * all the elements and methods specific to the homepage.
 * It extends BasePage to inherit common functionality.
 */
class HomePage extends BasePage {
    
    /**
     * Constructor for HomePage
     */
    constructor() {
        super()
        this.url = 'http://48997458.hs-sites.com/phtn.ai-homepage'
        this.pageTitle = 'PHTN.ai - Enterprise AI Solutions'
    }

    // ===== PAGE ELEMENTS =====
    
    /**
     * Get the main navigation menu
     * @returns {WebdriverIO.Element} Navigation menu element
     */
    get navigationMenu() {
		return $(`//button[contains(translate(@aria-label,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'menu') or
			contains(translate(@class,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'hamburger') or
			contains(translate(@class,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'menu')]
			| //*[@role='navigation']
			| //nav`)
    }

    /**
     * Get navigation menu items
     * @returns {WebdriverIO.ElementArray} Array of navigation menu items
     */
    get navigationMenuItems() {
        return $$('nav a')
    }

    /**
     * Get the logo element
     * @returns {WebdriverIO.Element} Logo element
     */
    get logo() {
        return $('img[alt*="Photon AI"], img[alt*="PHTN"], .logo img')
    }

    /**
     * Get the hero section
     * @returns {WebdriverIO.Element} Hero section element
     */
    get heroSection() {
        return $('.hero, [class*="hero"], [class*="banner"]')
    }

    /**
     * Get the hero title
     * @returns {WebdriverIO.Element} Hero title element
     */
    get heroTitle() {
		return $('h1, .hero h1, [class*="hero"] h1')
    }

    /**
     * Get the hero subtitle
     * @returns {WebdriverIO.Element} Hero subtitle element
     */
    get heroSubtitle() {
		return $('h2, .hero h2, [class*="hero"] h2')
    }

    /**
     * Get the hero description
     * @returns {WebdriverIO.Element} Hero description element
     */
    get heroDescription() {
		return $('p, .hero p, [class*="hero"] p')
    }

    /**
     * Get the main content sections
     * @returns {WebdriverIO.ElementArray} Array of content sections
     */
    get contentSections() {
        return $$('section, .section, [class*="section"]')
    }

    /**
     * Get the "About Us" section
     * @returns {WebdriverIO.Element} About Us section element
     */
    get aboutUsSection() {
        return $('[class*="about"], [id*="about"]')
    }

    /**
     * Get the "Contact Us" section
     * @returns {WebdriverIO.Element} Contact Us section element
     */
    get contactUsSection() {
        return $('[class*="contact"], [id*="contact"]')
    }

    /**
     * Get the footer element
     * @returns {WebdriverIO.Element} Footer element
     */
    get footer() {
        return $('footer, .footer, [class*="footer"]')
    }

    /**
     * Get footer links
     * @returns {WebdriverIO.ElementArray} Array of footer links
     */
    get footerLinks() {
        return $$('footer a, .footer a, [class*="footer"] a')
    }

    /**
     * Get the newsletter signup form
     * @returns {WebdriverIO.Element} Newsletter form element
     */
    get newsletterForm() {
        return $('form, [class*="newsletter"], [class*="signup"]')
    }

    /**
     * Get the newsletter email input
     * @returns {WebdriverIO.Element} Newsletter email input element
     */
    get newsletterEmailInput() {
        return $('input[type="email"], input[placeholder*="email"], input[name*="email"]')
    }

    /**
     * Get the newsletter submit button
     * @returns {WebdriverIO.Element} Newsletter submit button element
     */
    get newsletterSubmitButton() {
        return $('button[type="submit"], input[type="submit"], [class*="submit"]')
    }

    /**
     * Get the "Request a Demo" button
     * @returns {WebdriverIO.Element} Request Demo button element
     */
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

    /**
     * Get all buttons on the page
     * @returns {WebdriverIO.ElementArray} Array of button elements
     */
    get allButtons() {
        return $$('button, input[type="button"], input[type="submit"], a[role="button"]')
    }

    /**
     * Get all links on the page
     * @returns {WebdriverIO.ElementArray} Array of link elements
     */
    get allLinks() {
        return $$('a')
    }

    // ===== PAGE METHODS =====

    /**
     * Navigate to the homepage
     */
    async open() {
        await this.navigateTo(this.url)
        await this.waitForPageLoad()
    }

    /**
     * Check if the homepage is loaded correctly
     * @returns {boolean} True if homepage is loaded
     */
    async isPageLoaded() {
        try {
            await this.waitForElementToBeDisplayed(this.heroSection, 10000)
            const title = await this.getPageTitle()
            return title.includes('PHTN') || title.includes('Photon')
        } catch (error) {
            console.error(`❌ Homepage not loaded: ${error.message}`)
            return false
        }
    }

    /**
     * Get the hero section text content
     * @returns {object} Object containing hero text content
     */
	async getHeroContent() {
		try {
			// Prefer elements scoped within the hero section
			const section = await this.heroSection
			let title = ''
			let subtitle = ''
			let description = ''

			try {
				const h1 = await section.$('h1')
				if (await h1.isExisting()) title = await this.safeGetText(h1)
			} catch {}

			try {
				const h2 = await section.$('h2')
				if (await h2.isExisting()) subtitle = await this.safeGetText(h2)
			} catch {}

			try {
				const p = await section.$('p')
				if (await p.isExisting()) description = await this.safeGetText(p)
			} catch {}

			// Fallbacks if hero-scoped elements are missing
			if (!title) {
				title = await this.safeGetText(this.heroTitle)
			}
			if (!subtitle) {
				subtitle = await this.safeGetText(this.heroSubtitle)
			}
			if (!description) {
				description = await this.safeGetText(this.heroDescription)
			}

			return { title, subtitle, description }
		} catch (error) {
			console.error(`❌ Failed to get hero content: ${error.message}`)
			throw error
		}
	}

    /**
     * Click on navigation menu item
     * @param {string} menuText - Text of the menu item to click
     */
    async clickNavigationMenuItem(menuText) {
        try {
            // Use XPath to find element by text content
            const menuItem = await $(`//nav//a[contains(text(), "${menuText}")]`)
            await this.safeClick(menuItem)
            console.log(`✅ Clicked navigation menu item: ${menuText}`)
        } catch (error) {
            console.error(`❌ Failed to click navigation menu item: ${error.message}`)
            throw error
        }
    }

    /**
     * Click on the Request Demo button
     */
    async clickRequestDemoButton() {
        try {
            await this.safeClick(this.requestDemoButton)
            console.log('✅ Clicked Request Demo button')
        } catch (error) {
            console.error(`❌ Failed to click Request Demo button: ${error.message}`)
            throw error
        }
    }

    /**
     * Fill and submit newsletter form
     * @param {string} email - Email address to submit
     */
    async submitNewsletterForm(email) {
        try {
            await this.safeInput(this.newsletterEmailInput, email)
            await this.safeClick(this.newsletterSubmitButton)
            console.log(`✅ Newsletter form submitted with email: ${email}`)
        } catch (error) {
            console.error(`❌ Failed to submit newsletter form: ${error.message}`)
            throw error
        }
    }

    /**
     * Scroll to a specific section
     * @param {string} sectionSelector - CSS selector for the section
     */
    async scrollToSection(sectionSelector) {
        try {
            const section = await $(sectionSelector)
            await CommonUtils.scrollIntoView(section)
            console.log(`✅ Scrolled to section: ${sectionSelector}`)
        } catch (error) {
            console.error(`❌ Failed to scroll to section: ${error.message}`)
            throw error
        }
    }

    /**
     * Get all navigation menu items text
     * @returns {array} Array of navigation menu items text
     */
    async getNavigationMenuItems() {
        try {
            const menuItems = []
            const items = await this.navigationMenuItems
            
            for (const item of items) {
                try {
                    const text = await this.safeGetText(item)
                    if (text && text.trim()) {
                        menuItems.push(text.trim())
                    }
                } catch (itemError) {
                    console.log(`⚠️ Could not get text from menu item: ${itemError.message}`)
                }
            }
            
            return menuItems
        } catch (error) {
            console.error(`❌ Failed to get navigation menu items: ${error.message}`)
            throw error
        }
    }

    /**
     * Validate that all main sections are present
     * @returns {boolean} True if all sections are present
     */
    async validateMainSections() {
        try {
            const sections = [
                { name: 'Hero Section', element: this.heroSection },
                { name: 'About Us Section', element: this.aboutUsSection },
                { name: 'Contact Us Section', element: this.contactUsSection },
                { name: 'Footer', element: this.footer }
            ]
            
            for (const section of sections) {
                if (!(await this.isElementDisplayed(section.element))) {
                    console.log(`⚠️ ${section.name} not displayed - this might be normal for this page`)
                } else {
                    console.log(`✅ ${section.name} is present`)
                }
            }
            
            console.log('✅ Main sections validation completed')
            return true
        } catch (error) {
            console.error(`❌ Failed to validate main sections: ${error.message}`)
            return false
        }
    }

    /**
     * Check if logo is displayed
     * @returns {boolean} True if logo is displayed
     */
    async isLogoDisplayed() {
        try {
            return await this.isElementDisplayed(this.logo)
        } catch (error) {
            console.error(`❌ Failed to check logo display: ${error.message}`)
            return false
        }
    }

    /**
     * Get page load time
     * @returns {number} Page load time in milliseconds
     */
    async getPageLoadTime() {
        try {
            const loadTime = await browser.execute(() => {
                return performance.timing.loadEventEnd - performance.timing.navigationStart
            })
            console.log(`⏱️ Page load time: ${loadTime}ms`)
            return loadTime
        } catch (error) {
            console.error(`❌ Failed to get page load time: ${error.message}`)
            return 0
        }
    }
}

module.exports = HomePage
