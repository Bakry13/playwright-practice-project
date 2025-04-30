import { type Page } from "@playwright/test";
import { LoginPage } from "./login-page";
import { HomePage } from "./home-page";

export class POManager{
    private readonly page: Page; // Create a variable for the page
    private readonly loginPage: LoginPage;
    private readonly homePage: HomePage;
    //=====================Constructor==================
    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.homePage = new HomePage(this.page);
    }
    //=====================Methods======================
    getLoginPage(){
        return this.loginPage;
    }

    getHomePage(){
        return this.homePage;
    }
}