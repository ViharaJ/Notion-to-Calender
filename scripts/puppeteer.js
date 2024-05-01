import puppeteer from 'puppeteer';

export default async function scrapeDate(title) {
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();

    await page.goto('https://www.google.ca/');
    await page.type('.gLFyf', title + ' movie');

    await page.keyboard.press('Enter');
    await page.waitForNavigation();

    const relDate = await page.evaluate(() => {
        let t = document.querySelector(".LrzXr.kno-fv.wHYlTd.z8gr9e");
        
        if (t == null){
            return '-1';
        } else return t.innerText;
    });

    console.log(relDate);
    await browser.close();

    //if relDate is empty, crawl web?
    return {title, relDate};
    
}



// scrapeDate("Fall Risk Movie").then((res) => {console.log('done');});

