import { chromium, FullConfig } from "@playwright/test";
import { POManager } from '../../ui/pages/poManager';
import tsData from '../../../testData/testUsers';

async function globalSetup(config: FullConfig) {
    const storageStatePath = 'storageState.json';
    //====================Initialize env URL========================
    const { baseURL, storageState } = config.projects[0].use;
    //==================Initialize default login=====================
    const browser = await chromium.launch({headless: true, timeout: 10000});
    const page = await browser.newPage();
    const po = new POManager(page);
    const loginPage = po.getLoginPage();
    await page.goto(baseURL!);
    await loginPage.login(tsData.username, tsData.password);
    await page.context().storageState({ path: storageStatePath});
    await browser.close();
}

export default globalSetup;
