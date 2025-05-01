import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { HomePage } from '../pages/home-page';
//===================Variables===================
let loginPage: LoginPage;
let homePage: HomePage;
//===================Hooks======================
test.beforeAll('This actions run before all tests',async () =>{
    console.log('This actions run before all tests');
}) 

test.beforeEach('This actions run before every test',async ({page}, testInfo) =>{
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.open();
    console.log(`test starts for: ${testInfo.title}`);
})

test.afterEach('This actions run after every test',async ({page}, testInfo) =>{
    console.log(`test ends for: ${testInfo.title}`);
})

test.afterAll('This actions run after all tests',async () =>{
    console.log('This actions run after all tests');
})
//====================Tests======================
test.describe('Login test', ()=> {
    test('valid login', async ({ page }) => {
        await loginPage.login('Admin', 'admin123');
        await homePage.assertProfileIcon();
    });

    test('invalid login', async ({ page }) => {
        await loginPage.login('Admin', 'admin12');
        await loginPage.assertInvalidLoginMessage();
    }); 
});