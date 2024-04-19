import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

async function findPage(title) {
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();

    await page.goto('https://www.google.ca/');
    await page.type('.gLFyf', title + ' movie');

    await page.keyboard.press('Enter');
    await page.waitForNavigation();

    await page.screenshot({path: "example.png", fullPage:true});

    const pageToScrape = page.url();
    await browser.close();

    return pageToScrape;
}



findPage("Exhuma");
