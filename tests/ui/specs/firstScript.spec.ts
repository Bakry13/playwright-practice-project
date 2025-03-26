import { test, expect } from '@playwright/test';
import getEnvironment from '../../utils/setup/envSetup';

test.describe('Login test @ft', ()=> {
    test.only('valid login', async ({page}, testInfo) => {
        getEnvironment.getEnv();
        await page.goto('https://practice.expandtesting.com/login');
        await page.pause();
        await page.locator("//input[@id='username']").fill('practice');
        await page.locator("//input[@id='password']").fill("SuperSecretPassword!");
        // await page.screenshot({path: 'screenshots/login.png'});
        // testInfo.attach(`${testInfo.title}`, {path: 'screenshots/login.png'});
        await page.locator("//button[normalize-space()='Login']").click();
        await expect(page.locator("div[id='flash'] b")).toContainText("You logged into a secure area!");
    });
    
    test('invalid login', async ({page}) => {
        await page.goto('https://practice.expandtesting.com/login');
        await page.locator("//input[@id='username']").fill('practice');
        await page.locator("//input[@id='password']").fill("SuperSecretPassword");
        await page.locator("//button[normalize-space()='Login']").click();
        await expect(page.locator("div[id='flash'] b")).toContainText("Your password is invalid!");
    });
});
