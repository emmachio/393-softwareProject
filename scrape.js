import puppeteer from "puppeteer";

const scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    const url = 'https://books.toscrape.com';

    await page.goto(url);

    const title = await page.title();
    console.log(title);

    //await browser.close();
};

scrape();