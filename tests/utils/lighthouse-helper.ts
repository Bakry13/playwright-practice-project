// import { test, TestInfo, chromium, type Page } from "@playwright/test";
// import * as fs from "fs";
// import * as path from "path";
// import * as os from "os";
// import { playAudit } from "playwright-lighthouse";
// import envHelper from "../helpers/env-helper";
// import { InternalLoginPage } from "../../ui/pages/internal-portal/internal-login-page";
// import { exec } from 'child_process';

// let context;
// //----------------------open the browser---------------------
// async function openChromeContext() {
//     const userDataDir = path.join(os.tmpdir(), 'pw', String(Math.random()));
//     context = await chromium.launchPersistentContext(userDataDir, {
//         args: ['--remote-debugging-port=9222']
//         });
//     const page = await context.newPage();
//     return page;
// }

// async function loginToInternalPortal() {
//     let page = await openChromeContext();
//     const username = envHelper.getLoginData()!.users.internalUser.username;
//     const password = envHelper.getLoginData()!.users.internalUser.password;
//     const internalLoginPage= new InternalLoginPage(page);
//     await internalLoginPage.open();
//     await internalLoginPage.login(username, password);
//     return page;
// }

// async function checkFEPerformance(testInfo: TestInfo, portalName: string = 'internal', pageURL?: string) {
//     const reportRootPath = './lh-reports';
//     let reportPath = './lh-reports/lh-report.html';
//     let page;
//     if (portalName === 'internal') {
//         page = await loginToInternalPortal();
//         await page.goto(pageURL);
//         reportPath = `${reportRootPath}/lh-report.html`;
//     }

//     await test.step(`I check the frontend performance of the internal website`, async () => {
//         // When lighthouse opens a new page the storage will be persisted meaning the new page will have the same user session
//         try {
//             await playAudit({
//             page: page,
//             thresholds: {
//                 performance: 90,
//                 accessibility: 90,
//                 'best-practices': 90,
//                 seo: 90
//             },
//             port: 9222,
//             //Generate the report in the specified path
//             reports: {
//                 formats: {
//                 json: true, //defaults to false
//                 html: true, //defaults to false
//                 csv: true, //defaults to false
//                 },
//                 name: `lh-report`, //defaults to `lighthouse-${new Date().getTime()}`
//                 directory: `lh-reports`, //defaults to `${process.cwd()}/lighthouse`
//             },
//         });
//         } catch (error) {
//             console.error(`❌ Error: ${error.message}`);
//             test.fail();
//         }
//         await context.close();
//         console.log(`✅ Lighthouse performance check completed for ${portalName} website.`);
//         attachLHReport(reportPath, testInfo);
//     });   
// }

// //----------- attach the report to the test info ------------
// async function attachLHReport(reportPath: string, testInfo: TestInfo) {
//     if (fs.existsSync(reportPath)) {
//         await testInfo.attach('Lighthouse Report', {
//             path: reportPath,
//             contentType: 'text/html',
//         });
//     }
// }

// async function checkFEPerformanceUsingLHCI(testInfo: TestInfo, portalName: string = 'internal') {
//     const reportRootPath = './lhci-reports';
//     let reportPath = './lhci-reports';
//     if (portalName === 'internal') {
//         reportPath = `${reportRootPath}/lh-report.html`;
//     }
    
//     await test.step(`I check the frontend performance of the internal website`, async () => {
//         const lhciPath = path.resolve('./node_modules/.bin/lhci');
//         const command = `"${lhciPath}" autorun`;
        
//         return new Promise<void>((resolve, reject) => {
//             exec(command, (error, stdout, stderr) => {
//                 console.log(`Checking frontend performance for ${portalName} website using lighthouse...`);
//                 if (error) {
//                     console.error(`❌ Error: ${error.message}`);
//                     reject(error);
//                     // return;
//                 }
//                 // if (stderr) {
//                 //     console.error(`⚠️ STDERR: ${stderr}`);
//                 // }
//                 console.log(`✅ Lighthouse Output:\n${stdout}`);
//                 attachLHReport(reportPath, testInfo);
//                 resolve();
//             });
//         });
//     });
// }

// export default { checkFEPerformance, checkFEPerformanceUsingLHCI };