import { test } from '@playwright/test';

test.describe('update personal details', ()=> {
    test('verify profile name after changing name', async ({ page }) => {
        await page.goto('/');
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByText("My Info").click();
        await page.getByPlaceholder("First Name").fill('Mohamed');
        await page.getByPlaceholder("Middle Name").fill('Bakry');
        await page.getByPlaceholder("Last Name").fill('Bakry');
        await page.locator("//div[@class='orangehrm-horizontal-padding orangehrm-vertical-padding']//button[@type='submit'][normalize-space()='Save']").click();
    });
});