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


async function scrapeDate(url) {
    const res = await fetch(url);
    const htmlPage = await res.text();

    const $ = cheerio.load(htmlPage);
    let relDate = $('.LrzXr.kno-fv.wHYlTd.z8gr9e').contents();

    const fruits = [];

    $('li').each(function (i, elem) {
    fruits[i] = $(this).text();
    });

    fruits.join(', ');

    console.log(fruits);
}

findPage("Challengers").then(scrapeDate);
