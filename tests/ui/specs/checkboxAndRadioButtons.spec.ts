import { test, expect } from '@playwright/test';

test.describe('Interacting with checkboxes and radio buttons', ()=> {
    test('checkboxes', async ({page}) => {
        await page.goto('https://practice.expandtesting.com/checkboxes');
        //using click
        // await page.locator("#checkbox1").click();
        // await page.locator("#checkbox2").click();
        //using check
        // await page.locator("#checkbox1").check({force: true});
        // await page.locator("#checkbox2").uncheck();
        // //assertions
        // await expect(page.locator("#checkbox1")).toBeChecked();
        // await expect(page.locator("#checkbox2")).not.toBeChecked();

        const checkboxesLocators = [
            page.locator("#checkbox1"),
            page.locator("#checkbox2")
        ];

        for (const checkbox of checkboxesLocators) {
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    });

    test('radioButtons', async ({page}) => {
        await page.goto('https://practice.expandtesting.com/radio-buttons');
        //using click
        await page.locator("#red").click({force: true});
        await page.getByLabel("Black").check();
        //assertions
        await expect(page.locator("#red")).not.toBeChecked();
        await expect(page.getByLabel("Black")).toBeChecked();
    });
});