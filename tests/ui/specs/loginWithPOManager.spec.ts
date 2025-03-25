import { test } from '@playwright/test';
import { POManager } from '../pages/poManager';
//===================Variables===================
let poManager: POManager;
//===================Hooks======================
test.beforeAll('This actions run before all tests',async () =>{
    console.log('This actions run before all tests');
}) 

test.beforeEach('This actions run before every test',async ({page}, testInfo) =>{
    poManager = new POManager(page);
    await poManager.getLoginPage().open();
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
        await poManager.getLoginPage().login('Admin', 'admin123');
        await poManager.getHomePage().assertProfileIcon();
    });

    test('invalid login', async ({ page }) => {
        await poManager.getLoginPage().login('Admin', 'admin12');
        await poManager.getLoginPage().assertInvalidLoginMessage();
    }); 
});