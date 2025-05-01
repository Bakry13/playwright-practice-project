import { test, webkit } from '@playwright/test';

test('apply browser context', async () => {
    const browser = await webkit.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await page.pause();
});