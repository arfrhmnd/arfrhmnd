import { test, expect } from '@playwright/test';
import { homePage } from '../page-object/homePage';


test('Then user should see the contact us Form fields', async ({ page }) => {
    const MainPage = new homePage(page);
    await MainPage.goto();
    
    // Navigate to contact us page
    await page.locator('//*[@id="hs_cos_wrapper_menu"]/nav/div[3]/div/a').click();
    await expect(page.getByText('how can we help you?')).toBeVisible();
    
    // Verify contact form fields are visible
    await expect(page.getByRole('textbox', { name: 'First Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Company Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Message' })).toBeVisible();
    await expect(page.locator('.contact-us-form-wrapper .hsfc-Button')).toBeVisible();
});

test('User can fill out the contact us form', async ({ page }) => {
    const MainPage = new homePage(page);
    await MainPage.goto();
    
    // Navigate to contact us page
    await page.locator('//*[@id="hs_cos_wrapper_menu"]/nav/div[3]/div/a').click();
    await expect(page.getByText('how can we help you?')).toBeVisible();
    
    // Fill out the form
    await page.getByRole('textbox', { name: 'First Name' }).fill('John');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
    await page.getByRole('textbox', { name: 'Company Name' }).fill('Photon Interactive UK Limited');
    await page.getByRole('textbox', { name: 'Email' }).fill('test@photon.com');
    await page.getByRole('textbox', { name: 'Message' }).fill('This is a test message for the contact form.');
    
    // Verify fields are filled
    await expect(page.getByRole('textbox', { name: 'First Name' })).toHaveValue('John');
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toHaveValue('Doe');
    await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue('test@photon.com');
    await expect(page.getByRole('textbox', { name: 'Company Name' })).toHaveValue('Photon Interactive UK Limited');
    await expect(page.getByRole('textbox', { name: 'Message' })).toHaveValue('This is a test message for the contact form.');
    await expect(page.locator('.contact-us-form-wrapper .hsfc-Button')).toBeVisible();
    await page.locator('.contact-us-form-wrapper .hsfc-Button').click();
    await expect(page.getByText('Thank you')).toBeVisible();
    await expect(page.getByText('We\'ll be in touch soon.')).toBeVisible();

});

test('User trying to submit another form with another Subject', async ({ page }) => {
    const MainPage = new homePage(page);
    await MainPage.goto();
    
    // Navigate to contact us page
    await page.locator('//*[@id="hs_cos_wrapper_menu"]/nav/div[3]/div/a').click();
    await expect(page.getByText('how can we help you?')).toBeVisible();
    
    // Fill out the form
    await page.getByText('Careers', { exact: false }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill('John');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
    await page.getByRole('textbox', { name: 'Company Name' }).fill('Photon Interactive UK Limited');
    await page.getByRole('textbox', { name: 'Email' }).fill('test@photon.com');
    await page.getByRole('textbox', { name: 'Message' }).fill('This is a test message for the contact form.');
    
    // Verify fields are filled
    await expect(page.getByRole('textbox', { name: 'First Name' })).toHaveValue('John');
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toHaveValue('Doe');
    await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue('test@photon.com');
    await expect(page.getByRole('textbox', { name: 'Company Name' })).toHaveValue('Photon Interactive UK Limited');
    await expect(page.getByRole('textbox', { name: 'Message' })).toHaveValue('This is a test message for the contact form.');
    await expect(page.locator('.contact-us-form-wrapper .hsfc-Button')).toBeVisible();
    await page.locator('.contact-us-form-wrapper .hsfc-Button').click();
    await expect(page.getByText('Thank you')).toBeVisible();
    await expect(page.getByText('We\'ll be in touch soon.')).toBeVisible();

});