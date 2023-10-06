const { test, expect } = require("@playwright/test");

exports.Helper = class Helper {
    constructor(page) {
        this.page = page;

        // language locators
        this.languageButton = page.locator('li.nav-item.dropdown.utility.language');
        this.chooseLanguageTextbox = page.getByRole('textbox', { name: 'Language' });
        this.englishLanguage =  page.getByRole('button', { name: 'EN English' });
        
        // cookie locator
        this.acceptCookiesButton = page.getByRole('button', { name: 'Accept All' });
    }

    async selectLanguageEN(){
        await this.languageButton.click();
        await this.chooseLanguageTextbox.click();
        await this.englishLanguage.click();
    }

    async acceptCookies(){
        await this.acceptCookiesButton.click();
    }
};