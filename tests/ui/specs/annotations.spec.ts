import { test, expect } from '@playwright/test';

test.beforeAll('This actions run before all tests',async () =>{
    console.log('This actions run before all tests');
}) 

test.beforeEach('This actions run before every test',async ({page}, testInfo) =>{
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    console.log(`test starts for: ${testInfo.title}`);
})

test.afterEach('This actions run after every test',async ({page}, testInfo) =>{
    console.log(`test ends for: ${testInfo.title}`);
})

test.afterAll('This actions run after all tests',async () =>{
    console.log('This actions run after all tests');
})

test.describe('Login test', ()=> {
    test('valid login',{
        tag: ['@ui', '@smoke'],
        annotation: {
            type: 'smoke test',
            description: 'smoke test for valid login',
        },
    }, async ({ page, browserName }) => {
        // test.skip(browserName === 'firefox', 'Still working on it');
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByAltText('profile picture')).toBeVisible();;
    });

    test('invalid login',{
        tag: '@ui'
    }, async ({ page }) => {
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin12');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.locator("//p[@class='oxd-text oxd-text--p oxd-alert-content-text']")).toHaveText("Invalid credentials");
    }); 
});

test.describe('Login test - group2', ()=> {
    test.skip('valid login - group2', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByAltText('profile picture')).toBeVisible();;
    });

    test.fixme('invalid login - group2', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin12');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.locator("//p[@class='oxd-text oxd-text--p oxd-alert-content-text']")).toHaveText("Invalid credentials");
    }); 
});