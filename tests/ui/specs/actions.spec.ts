import { test, expect } from '@playwright/test';

test.describe('Login test', ()=> {
    test('valid login', async ({page}) => {
        //1 - goto
        await page.goto('https://practice.expandtesting.com');
        await page.goto('https://practice.expandtesting.com/login');
        await expect.soft(page).toHaveURL('https://practice.expandtesting.com');
        //2- reload
        await page.reload();
        //3- goback
        await page.goBack();
        //4- forward
        await page.goForward();
        //5- fill
        await page.locator("[id='username']").fill('practice');
        await page.getByLabel("Password").fill("SuperSecretPassword!");
        //6- click
        await page.getByRole('button', { name: 'Login' }).click();
        const textContent = await page.locator("div[id='flash'] b").textContent();
        console.log(textContent);
        //7- toBeVisible
        await expect(page.locator("div[id='flash'] b")).toBeVisible();
    });

    test('search', async ({page}) => {
        await page.goto('https://practice.expandtesting.com');
        await page.getByPlaceholder("Search an example...").fill('login');
        await page.locator("//a[normalize-space()='Test Login Page']").click();
        await expect(page).toHaveTitle('Test Login Page for Automation Testing Practice');
    });

    test('keys and shortcuts', async ({page}) => {
        await page.goto('https://practice.expandtesting.com/login');
        await page.locator("//div[@class='col-9']").press("Control+A");
        await page.locator("//input[@id='username']").fill('practice');
        await page.locator("//input[@id='password']").fill("SuperSecretPassword!");
        await page.locator("//button[normalize-space()='Login']").press('Enter');
        await expect(page.locator("div[id='flash'] b")).toContainText("You logged into a secure area!");
    });

    test('keyboard', async ({page}) => {
        await page.goto('https://practice.expandtesting.com/login');
        await page.locator("//input[@id='username']").click();
        await page.keyboard.type('practiceY');
        await page.keyboard.press('Backspace');
        await page.locator("//input[@id='password']").fill("SuperSecretPassword!");
        await page.locator("//button[normalize-space()='Login']").press('Enter');
        await expect(page.locator("div[id='flash'] b")).toContainText("You logged into a secure area!");
    });

    test('Upload files', async ({page}) => {
        await page.goto('https://demo.automationtesting.in/FileUpload.html');
        //1- upload single file
        // await page.locator("#input-4").setInputFiles('test-data/testFile1.txt');
        //2- upload multiple files
        await page.locator("#input-4").setInputFiles(['test-data/testFile1.txt', 'test-data/testFile2.docs']);
        await page.locator("//button[@title='Upload selected files']").click();
        //assertion
        await expect(page.locator("(//div[@title='testFile1.txt'])[1]")).toBeVisible();
        //remove files
        await page.locator("#input-4").setInputFiles([]);
    });

    test('drag and drop', async ({page}) => {
        await page.goto('https://practice.expandtesting.com/drag-and-drop-circles');
        const redLocator = page.locator(".red");
        const greenLocator = page.locator(".green");
        const targetLocator = page.locator("#target");
        //1- using mouse actions
        await redLocator.hover();
        await page.mouse.down();
        await targetLocator.hover();
        await page.mouse.up();
        //2- using playright actions
        await greenLocator.dragTo(targetLocator);
    });
});
