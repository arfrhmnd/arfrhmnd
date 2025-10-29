import { test, expect } from '@playwright/test';
import { homePage } from '../page-object/homePage';

test.describe('@HomePage', () => {
test('When User navigates to the home page, they should see the home page', async ({ page }) => {
    const MainPage = new homePage(page);
    await MainPage.goto();
    await expect(page).toHaveURL('https://48997458.hs-sites.com/phtn.ai-homepage');
    await expect(page.locator('//*[@id="hs_cos_wrapper_menu"]/nav/div[1]/div/a')).toBeVisible();
});

test('Then user clicks on the about us menu button', async ({ page }) => {
    const MainPage = new homePage(page);
    await MainPage.goto();
    await page.locator('//*[@id="hs_cos_wrapper_menu"]/nav/div[2]/div/a').click();
    await expect(page.getByText('our vision')).toBeVisible();
});

test('Then user clicks on the contact us menu button', async ({ page }) => {
    const MainPage = new homePage(page);
    await MainPage.goto();
    await page.locator('//*[@id="hs_cos_wrapper_menu"]/nav/div[3]/div/a').click();
    await expect(page.getByText('how can we help you?')).toBeVisible();
});

test('User should be able to fill out Newsletter form', async ({ page }) => {
    const MainPage = new homePage(page);
    await MainPage.goto();
    await expect(page.getByText('stay in the know')).toBeVisible();
    await page.locator('//*[@id="hs_form_target_form_news_letter-3-input"]').click();
    await page.getByText('Enter email address').fill('test@photon.com');
    await page.locator('//*[@id="hs_form_target_form_news_letter-15"]').click();
    await expect(page.getByText('Thank you for subscribing!')).toBeVisible();
});
    });
//end of test suite