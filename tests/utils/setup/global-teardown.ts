import { chromium, FullConfig } from "@playwright/test";

async function globalTeardown(config: FullConfig) {
    //====================Initialize env URL========================
    const { baseURL } = config.projects[0].use;
    //==================Initialize default login=====================
    const browser = await chromium.launch({headless: false, timeout: 10000});
    const page = await browser.newPage();
    await page.goto(baseURL!);
    await browser.close();
}

export default globalTeardown;
