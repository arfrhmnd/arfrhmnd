import { test, expect, Page } from '@playwright/test';


//class to declare goto URL
export class homePage {
  constructor(private readonly page: Page) { }
  
  async goto() {
    await this.page.goto('https://48997458.hs-sites.com/phtn.ai-homepage');
  }
}