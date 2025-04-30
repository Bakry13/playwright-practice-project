import { expect, type Locator, type Page } from "@playwright/test"; // Import expect, Locator, and Page from Playwright

export class HomePage{
    //=====================Locators=====================
    readonly page: Page; // Create a variable for the page
    readonly profile_icn: Locator; // Create a variable for the profile icon
    //=====================Variables====================
    //=====================Constructor==================
    constructor(page: Page) {
        this.page = page;
        this.profile_icn = page.locator("//img[@class='oxd-userdropdown-img']"); // Set the profile icon locator
    }
    //=====================Methods======================
    //---------------------Actions----------------------
    //---------------------Assertions-------------------
    async assertProfileIcon(){
        await expect(this.profile_icn).toBeVisible();
    }
}