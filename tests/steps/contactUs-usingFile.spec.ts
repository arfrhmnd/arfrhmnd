import { test, expect } from '@playwright/test';
import { homePage } from '../page-object/homePage';
import testData from '../test-data/contactFormData.json';


//test data driven from JSON file
test.describe('@ContactUs - Data Driven from JSON', () => {
  for (const data of testData) {
    test(data.testCase, async ({ page }) => {
      const MainPage = new homePage(page);
      await MainPage.goto();
      
      await page.locator('//*[@id="hs_cos_wrapper_menu"]/nav/div[3]/div/a').click();
      await expect(page.getByText('how can we help you?')).toBeVisible();
      
      await page.getByRole('textbox', { name: 'First Name' }).fill(data.firstName);
      await page.getByRole('textbox', { name: 'Last Name' }).fill(data.lastName);
      await page.getByRole('textbox', { name: 'Company Name' }).fill(data.company);
      await page.getByRole('textbox', { name: 'Email' }).fill(data.email);
      await page.getByRole('textbox', { name: 'Message' }).fill(data.message);
      
      await page.locator('.contact-us-form-wrapper .hsfc-Button').click();
      await expect(page.getByText('We\'ll be in touch soon.')).toBeVisible();
    });
  }
});