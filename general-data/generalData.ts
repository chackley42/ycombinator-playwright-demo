import { Browser, BrowserContext, Page } from "playwright/test";

// General Data regarding the hackernews website. More classes, enums, etc. may be added.

export class GeneralData {
    static page: Page;
    static context: BrowserContext;
    static browser: Browser;
}