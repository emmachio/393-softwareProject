import puppeteer from 'puppeteer';

//const pt = require('puppeteer');
const browser = await puppeteer.launch({headless: false});


//const browser = await puppeteer.launch();
const page = await browser.newPage();
//What page to go to
await page.goto('https://developer.chrome.com/');
//Set page size
await page.setViewport({width: 1080, height: 1024})







// //type into search box
// await page.locator('.devsite-search-field').fill('beef');
//    // Wait for the search results to appear
//     await page.waitForSelector('.devsite-result-item-link', { timeout: 5000 });
//
// await page.locator('.devsite-result-item-link').click();
//
//
// const textSelector = await page
//     .locator('text/Customize and automate')
//     .waitHandle();
// const fullTitle = await textSelector?.evaluate(el => el.textContent);
//
// // Print the full title.
// console.log('The title of this blog post is "%s".', fullTitle);


