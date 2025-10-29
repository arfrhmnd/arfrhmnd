import { test, expect } from '@playwright/test';
import { homePage } from '../page-object/homePage';

test.describe('@AboutUs', () => {
test('Then user should see the about us page', async ({ page }) => {
    const MainPage = new homePage(page);
    await MainPage.goto();
    await page.locator('//*[@id="hs_cos_wrapper_menu"]/nav/div[2]/div/a').click();
    await expect(page.getByText('our vision')).toBeVisible();
});
});