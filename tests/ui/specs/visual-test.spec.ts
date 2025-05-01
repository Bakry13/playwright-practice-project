import { test, expect } from '@playwright/test';
//====================================Tests==================================
test('visual comparison', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/auth_ecommerce');
    await expect(page).toHaveScreenshot();
    });

test.only('visual comparison for dynamic elements', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/visual');
    await expect(page).toHaveScreenshot();
    });