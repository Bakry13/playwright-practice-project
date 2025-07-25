import { test, expect, type Page, TestInfo } from "@playwright/test";
import { POManager } from "../ui/pages/po-manager";
import * as fs from "fs";
import { exec } from "child_process";
import path from "path";

let poManager: POManager;

async function resizeViewport(page: Page, viewport: { width?: number; height?: number }) {
    if (!viewport.width) viewport.width = page.viewportSize()!.width;
    if (!viewport.height) viewport.height = page.viewportSize()!.height;
    await test.step(`I resize my emulator screen to 'width: ${viewport.width}, height: ${viewport.height}'`, async () => {
        await page.setViewportSize({ width: viewport.width ?? 1280, height: viewport.height ?? 720 });
    });
}

async function performVisualCheck(page: Page, maxDiffRatio?: number) {
    poManager = new POManager(page);
    await test.step(`I perform a visual check on the page`, async () => {
        // generally before calling this function, we wait for elements to be visible
        // await poManager.getCommonPage()?.assertLoaderNotExist(); // we make sure loader is not visible on top of element

        // adjust the viewport size to fit full height of the screen
        const originalHeight = page.viewportSize()?.height ?? 720;
        const currentPageHeight = await page.evaluate(() => document.body.scrollHeight);
        await resizeViewport(page, { height: currentPageHeight });

        await expect.soft(page).toHaveScreenshot({
            maxDiffPixelRatio: maxDiffRatio,
            fullPage: true
        });

        // reset to viewport size to the one defined in config
        await resizeViewport(page, { height: originalHeight });
    });
}
//----------- attach the report to the test info ------------
async function attachLHReport(reportPath: string, testInfo: TestInfo) {
    if (fs.existsSync(reportPath)) {
        await testInfo.attach('Lighthouse Report', {
            path: reportPath,
            contentType: 'text/html',
        });
    }
}


async function checkFEPerformance(testInfo: TestInfo) {
    const reportRootPath = './lhci-reports';
    let reportPath = `${reportRootPath}/lh-report.html`;
    
    await test.step(`I check the frontend performance of the internal website`, async () => {
        const lhciPath = path.resolve('./node_modules/.bin/lhci');
        const command = `"${lhciPath}" autorun`;
        
        return new Promise<void>((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                console.log(`Checking frontend performance for the website using lighthouse...`);
                if (error) {
                    console.error(`❌ Error: ${error.message}`);
                    reject(error);
                    // return;
                }
                // if (stderr) {
                //     console.error(`⚠️ STDERR: ${stderr}`);
                // }
                console.log(`✅ Lighthouse Output:\n${stdout}`);
                attachLHReport(reportPath, testInfo);
                resolve();
            });
        });
    });
}

export default { performVisualCheck, checkFEPerformance };