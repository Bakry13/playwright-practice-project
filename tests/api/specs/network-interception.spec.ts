import { test, expect } from '@playwright/test';
import { POManager } from '../../ui/pages/po-manager';
import tsData from '../../../test-data/test-users';
import mockedResponse from '../../../mocks/response-interception.json'
//===================Variables===================
let poManager: POManager;
//===================Hooks======================
test.beforeEach('This actions run before every test',async ({page}, testInfo) =>{
    poManager = new POManager(page);
    console.log(`test starts for: ${testInfo.title}`);
})
//====================Tests======================
test.describe('Network interception', ()=> {
    test('intercept browser api response', async ({ page, request }) => {
        await poManager.getLoginPage().open();
        await poManager.getLoginPage().login(tsData.username, tsData.password);
        await page.getByText("PIM").click();
        const employeeResponse = await page.waitForResponse('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC');
        const employeeResponseBody = await employeeResponse.json();
        console.log(employeeResponseBody);
        const empNumber = employeeResponseBody.data[0].empNumber;
        console.log(empNumber);
        const requestBody = {
            "ids": [empNumber]
        };
        const headers = {
            "Cookie": "orangehrm=73s9frst1lclj2cod0lc3uaf4b"
        };
        const deletedEmpResponse = await request.delete('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees',{
            data: requestBody,
            headers: headers
        })
        const deletedEmployeeResponseBody = await deletedEmpResponse.json();
        console.log(deletedEmployeeResponseBody);
    });
    
    test('Mocking1: mock api response', async ({ page }) => {
        await page.route('https://api.randomuser.me/?nat=us', async route =>{
            await route.fulfill({
                body: JSON.stringify(mockedResponse)
            })
        });

        await page.goto('https://demo.automationtesting.in/DynamicData.html');
        await page.locator('#save').click()
        await expect(page.locator('#loading')).toContainText("First Name : PlaywrightLast Name : User");
    });

    test('Mocking2: mock api response - another way', async ({ page }) => {
        await page.route('https://api.randomuser.me/?nat=us', async route =>{
            const response = await route.fetch();
            const responseBody = await response.json();
            responseBody.results[0].name.first = "Udemy";
            responseBody.results[0].name.last = "Course";
            await route.fulfill({
                body: JSON.stringify(responseBody)
            })
        });

        await page.goto('https://demo.automationtesting.in/DynamicData.html');
        await page.locator('#save').click()
        await expect(page.locator('#loading')).toContainText("First Name : UdemyLast Name : Course");
    });

    test('Mocking3 - intercept api request', async ({page}) => {
        await page.route('https://en.wikipedia.org/w/api.php?*', async route =>{
            await route.continue({url: 'https://en.wikipedia.org/w/api.php?action=opensearch&search=Udemy&format=json&callback=%3F&callback=callback'})
        });

        await page.goto('https://testautomationpractice.blogspot.com/');
        await page.locator("//input[@id='Wikipedia1_wikipedia-search-input']").fill('Hello');
        await page.locator("//input[@type='submit']").click();
        await expect(page.locator("//a[normalize-space()='Udemy']")).toBeVisible();
    });

    test('Abort the request', async ({page}) => {
        // await page.route('**/*.css', async route =>{
        //     await route.abort();
        // });
        // await page.goto('https://practice.expandtesting.com/');

        await page.route('**/*.{png,jpg,jpeg}', async route =>{
            await route.abort();
        });
        await page.goto('https://practice.automationtesting.in/');
    });
    
});