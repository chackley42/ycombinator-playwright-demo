// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
import {test, expect } from '@playwright/test';
import { Utils } from '../utils/utils';
import { HackerNewsMainPage } from '../pages/hacker-news-main-page';
import { GeneralData } from '../general-data/generalData';
import { link } from 'fs';


test.describe('Hacker News Main Page', () => {

  // Get top 10 data
  test.beforeAll( async () => {
    await Utils.openNewBrowser();
    await Utils.navigateTo("https://news.ycombinator.com/");
    await HackerNewsMainPage.getXnumberOfTopPostsData(10);
    await GeneralData.browser.close();
  });

  test.beforeEach(async ({page, context, browser}) => {
    await Utils.setBrowser(page, context, browser);
    await Utils.navigateTo("https://news.ycombinator.com/");
  }),

  test('Top posts links navigate to expected url', async () => {
    test.setTimeout(0); // May take a minute
    const nameColumn = "POST NAME";
    const linkColumn = "POST LINK";
    let postNameValues: string 
    let postUrlValues: string
    let postNameArray: string[] = [];
    let postUrlArray: string[] = [];
    postNameValues = await Utils.readFromCsv('posts.csv', nameColumn); 
    postUrlValues = await Utils.readFromCsv('posts.csv', linkColumn); 
    postNameArray = postNameValues.split(',');
    postUrlArray = postUrlValues.split(',');

    // Navigate to each url, and verify the url is in the matching index of the name.
    for (let i = 0; i < linkColumn.length; i++) {
      await Utils.navigateToDomContent(postUrlArray[i]);
      await Utils.verifyUrlIs(postUrlArray[i]);
    }
  });

  test('HackerNews tab menu navigates to expected tabs', async () => {
    //hackernews does not allow multiple requests quickly at a time. There is a need to wait between each navigation
    test.setTimeout(0); // May take a minute
    const newTab = "https://news.ycombinator.com/newest";
    const pastTab = "https://news.ycombinator.com/front";
    const commentsTab = "https://news.ycombinator.com/newcomments";
    const askTab = "https://news.ycombinator.com/ask";
    const showTab = "https://news.ycombinator.com/show";
    const jobsTab = "https://news.ycombinator.com/jobs";
    const submitTab = "https://news.ycombinator.com/submit";

    await HackerNewsMainPage.selectTab(HackerNewsMainPage.mainPageNew);
    await Utils.verifyUrlIs(newTab);
    await Utils.wait(2000);

    await HackerNewsMainPage.selectTab(HackerNewsMainPage.mainPagePast);
    await Utils.verifyUrlIs(pastTab);
    await Utils.wait(2000);

    await HackerNewsMainPage.selectTab(HackerNewsMainPage.mainPageComments);
    await Utils.verifyUrlIs(commentsTab);
    await Utils.wait(2000);

    await HackerNewsMainPage.selectTab(HackerNewsMainPage.mainPageAsk);
    await Utils.verifyUrlIs(askTab);
    await Utils.wait(2000);

    await HackerNewsMainPage.selectTab(HackerNewsMainPage.mainPageShow);
    await Utils.verifyUrlIs(showTab);
    await Utils.wait(2000);

    await HackerNewsMainPage.selectTab(HackerNewsMainPage.mainPageJobs);
    await Utils.verifyUrlIs(jobsTab);
    await Utils.wait(2000);

    await HackerNewsMainPage.selectTab(HackerNewsMainPage.mainPageSubmit);
    await Utils.verifyUrlIs(submitTab);
  });


});
