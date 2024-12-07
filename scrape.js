import puppeteer from "puppeteer";

const scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    const url = 'https://books.toscrape.com';

    await page.goto(url);

    //const title = await page.title();
    //console.log(title);

    const recipeNames = await page.evaluate(() => {
        const elements = document.querySelectorAll('h3 a');  // Select the <a> tags inside <h3>
        return Array.from(elements).map(el => el.textContent.trim());  // Extract only the text content
      });
    
    //await browser.close();
};

scrape();
