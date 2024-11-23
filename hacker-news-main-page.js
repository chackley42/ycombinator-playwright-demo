// This file contains functionality/data that will be reused across multiple test files (possibly)
import { Utils } from './utils/utils';
const { expect } = require('@playwright/test');

exports.HackerNewsMainPage = class HackerNewsMainPage {

    // element selectors
    static mainPageTableSelector = "#hnmain > tbody > tr:nth-child(3) > td > table > tbody";

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  static async getXnumberOfTopPostsData(number) {
    const topPosts = [];
    const topPostsLinks = [];
    const topPostsPoints = [];
    const topPostsComments = [];
    for (let i = 1; i < (3 * number); i+=3) {
      const title = await Utils.page.locator(`#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(${i}) > td:nth-child(3) > span `).innerText();
      const titleLink = await Utils.page.locator(`#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(${i}) > td:nth-child(3) > span > a `).getAttribute('href');
      topPosts.push(title);
      topPostsLinks.push(titleLink);
      let titlePoints, titleComments = [];

      try {
        titlePoints = await Utils.page.locator(`#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(${i + 1}) > td:nth-child(2) > span > span:nth-child(1) `).innerText();
      } catch (error) {
        titlePoints = "no points at time of test run";
      }
      topPostsPoints.push(titlePoints);
    
      try {
        titleComments = await Utils.page.locator(`#hnmain > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(${i + 1}) > td.subtext > span > a:nth-child(6)`).innerText();
      } catch (error) {
        titleComments = "no comments at time of test run";
      }
      topPostsComments.push(titleComments);
      
      await Utils.writeArraysToCsv(topPosts, topPostsLinks, topPostsPoints, topPostsComments, 'posts.csv');
    }
  }
};