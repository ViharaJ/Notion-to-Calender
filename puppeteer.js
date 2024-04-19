import puppeteer from 'puppeteer';

async function scrapeDate(title) {
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();

    await page.goto('https://www.google.ca/');
    await page.type('.gLFyf', title + ' movie');

    await page.keyboard.press('Enter');
    await page.waitForNavigation();

    const relDate = await page.evaluate(() => {
        let t = document.querySelector(".LrzXr.kno-fv.wHYlTd.z8gr9e");
        return t.innerText;
    });

    await browser.close();

    //if relDate is empty, crawl web?
    return relDate;
    
}



scrapeDate("Challengers").then((res) => {console.log(res);});
