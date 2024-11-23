import { chromium } from "@playwright/test";
import { Page, Browser, BrowserContext } from "@playwright/test";
import { GeneralData } from "../general-data/generalData";
import fs from 'fs';
import csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';

// Utils are generally things a user could do (opening a browser, oopen a page, etc.)

export class Utils {

    static async setBrowser(page: Page, context: BrowserContext, browser: Browser) {
      GeneralData.page = page;
      GeneralData.context = context;
      GeneralData.browser = browser;
    }

    static async openNewBrowser(){
      GeneralData.browser = await chromium.launch();
      GeneralData.context = await GeneralData.browser.newContext();
      GeneralData.page = await GeneralData.context.newPage();
    }

    static async wait(milliseconds) {
        await new Promise((resolve) => setTimeout(resolve, milliseconds));
    }

    static async verifyElementIsPresent(selector) {
        await GeneralData.page.waitForSelector(selector, { state: "attached"});
    }

    static async navigateTo(url: string){
        await GeneralData.page.goto(url);
    }

    static async navigateToDomContent(url: string){
      await GeneralData.page.goto(url, { waitUntil: 'domcontentloaded'});
  }

    static async verifyUrlIs(url: string){
        await GeneralData.page.waitForURL(url, { waitUntil: 'domcontentloaded' });
    }

    // User Reading methods

    static async writeArraysToCsv(postNames, postLinks, postPoints, postComments, filename) {
        const data = postNames.map((_, i) => ({
          name: postNames[i],
          link: postLinks[i],
          points: postPoints[i],
          comments: postComments[i],
        }));
    
        const writer = createObjectCsvWriter({
          path: filename,
          header: [
            { id: 'name', title: 'POST NAME' },
            { id: 'link', title: 'POST LINK' },
            { id: 'points', title: 'POST POINTS' },
            { id: 'comments', title: 'POST COMMENTS' },
          ],
        });
    
        await writer.writeRecords(data);
      }

      static async readFromCsv(filePath: string, columnName: string): Promise<string> {
        return new Promise((resolve, reject) => {
          const results: string[] = [];
      
          fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data[columnName]))
            .on('end', () => resolve(results.join(', ')))
            .on('error', (error) => reject(error));
        });
      }
}