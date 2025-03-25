import { test } from '@playwright/test';
import { POManager } from '../pages/poManager';
import jsonData from '../../../testData/testUsers.json'
import tsData from '../../../testData/testUsers';
import invalidData from '../../../testData/invalidTestUsers'
//===================Variables===================
let poManager: POManager;
//json format -> string -> ts object
const parsedJsonData = JSON.parse(JSON.stringify(jsonData));
//===================Hooks======================
test.beforeAll('This actions run before all tests',async () =>{
    console.log("json username: ", parsedJsonData.username);
    console.log("ts password: ", tsData.password);
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
        await poManager.getLoginPage().login(tsData.username, tsData.password);
        await poManager.getHomePage().assertProfileIcon();
    });
    
invalidData.forEach(({username, password, testType}) => {
    test(`invalid login for ${testType}`, async ({ page }) => {
        await poManager.getLoginPage().login(username, password);
        await poManager.getLoginPage().assertInvalidLoginMessage();
    }); 
});
});