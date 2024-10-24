import puppeteer from "puppeteer";

const scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    const url = 'https://walnuts.org/recipes/?';

    await page.goto(url);

    const title = await page.title();
    console.log('PAGE TITLE: ' + title);

    const recipeNames = await page.evaluate(() => {
        const elements = document.querySelectorAll('h3 a');  // Select the <a> tags inside <h3>
        return Array.from(elements).map(el => el.textContent.trim());  // Extract only the text content
      });
    console.log('ALL RECIPE NAMES: ', recipeNames);

    //await browser.close();
};

scrape();
