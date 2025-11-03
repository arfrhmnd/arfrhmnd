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
    await expect(page.getByText('our vision', { exact: true })).toBeVisible();
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
    await page.locator('#hs_form_target_form_news_letter-3-input').fill('test@photon.com');
    await page.getByRole('button', { name: 'Submit' });
    await expect(page.locator('#hs_cos_wrapper_title_news_letter_')).toBeVisible();
});
    });
//end of test suite