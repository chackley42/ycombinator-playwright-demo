// This file contains functionality/data that will be reused across multiple test files (possibly)
import { GeneralData } from '../general-data/generalData';
import { Utils } from '../utils/utils';

export class HackerNewsMainPage {

    // element selectors
    static mainPageTable = "#hnmain > tbody > tr:nth-child(3) > td > table > tbody";
    static mainPageHome = ".hnname";
    static mainPageNew = ".pagetop > a[href='newest']";
    static mainPagePast = ".pagetop > a[href='front']";
    static mainPageComments = ".pagetop > a[href='newcomments']";
    static mainPageAsk = ".pagetop > a[href='ask']";
    static mainPageShow = ".pagetop > a[href='show']";
    static mainPageJobs = ".pagetop > a[href='jobs']";
    static mainPageSubmit = ".pagetop > a[href='submit']";


  
  static async selectTab(tab: string) {
    await GeneralData.page.locator(`${tab}`).click();
  }


  static async getXnumberOfTopPostsData(number) {
    const topPosts: string[] = [];
    const topPostsLinks: string[] = [];
    const topPostsPoints: string[] = [];
    const topPostsComments: string[] = [];
    for (let i = 1; i < (3 * number); i+=3) {
      const title = await GeneralData.page.locator(`#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(${i}) > td:nth-child(3) > span `).innerText();
      const titleLink = await GeneralData.page.locator(`#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(${i}) > td:nth-child(3) > span > a `).getAttribute('href');
      topPosts.push(title);
      topPostsLinks.push(titleLink ?? "no link at time of run");
      let titlePoints: string
      let titleComments: string

      try {
        titlePoints = await GeneralData.page.locator(`#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(${i + 1}) > td:nth-child(2) > span > span:nth-child(1) `).innerText({ timeout: 3000});
      } catch (error) {
        titlePoints = "no points at time of test run";
      }
      topPostsPoints.push(titlePoints);
    
      try {
        titleComments = await GeneralData.page.locator(`#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(${i + 1}) > td.subtext > span > a:nth-child(6)`).innerText( { timeout: 3000 });
      } catch (error) {
        titleComments = "no comments at time of test run";
      }
      topPostsComments.push(titleComments);
      
      await Utils.writeArraysToCsv(topPosts, topPostsLinks, topPostsPoints, topPostsComments, 'posts.csv');
    }
  }
};