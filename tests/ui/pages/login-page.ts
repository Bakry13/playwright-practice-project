import { expect, type Locator, type Page } from "@playwright/test"; // Import expect, Locator, and Page from Playwright

export class LoginPage{
    //=====================Locators=====================
    readonly page: Page; // Create a variable for the page
    readonly username_tb: Locator; // Create a variable for the username textbox
    readonly password_tb: Locator; // Create a variable for the password textbox
    readonly login_btn: Locator; // Create a variable for the login button
    readonly invalidLoginMessage: Locator; // Create a variable for the invalid login message
    //=====================Variables====================
    readonly url: string = "https://opensource-demo.orangehrmlive.com/"; // Create a variable for the URL
    readonly invalidLoginMessageText: string = "Invalid credentials"; // Create a variable for the invalid login message text
    //=====================Constructor==================
    constructor(page: Page) {
        this.page = page;
        this.username_tb = page.getByPlaceholder('Username'); // Set the username textbox locator
        this.password_tb = page.getByPlaceholder('Password'); // Set the password textbox locator
        this.login_btn = page.getByRole('button', { name: 'Login' }); // Set the login button locator
        this.invalidLoginMessage = page.locator("//p[@class='oxd-text oxd-text--p oxd-alert-content-text']"); // Set the invalid login message locator
    }
    //=====================Methods======================
    //---------------------Actions----------------------
    async open(){
        await this.page.goto(this.url); // Open the URL
    }

    async login(username: string, password: string){
        await this.username_tb.fill(username); // Fill in the username textbox
        await this.password_tb.fill(password); // Fill in the password textbox
        await this.login_btn.click(); // Click the login button
    }
    //---------------------Assertions-------------------
    async assertInvalidLoginMessage(){
        await expect(this.invalidLoginMessage).toHaveText(this.invalidLoginMessageText); // Verify the invalid login message
    }
}