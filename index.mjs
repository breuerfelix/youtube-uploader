import puppeteer from 'puppeteer';
import {
  upload,
  nextStep,
  insertTitle,
  insertDescription,
  insertTags,
  tickKids,
  clickPublic,
  done,
} from './youtube';

// browser endpoint as first parameter
const browserWSEndpoint = process.argv.slice(2)[0];


async function main() {
  const browser = await puppeteer.connect({
    browserWSEndpoint,
    defaultViewport: null,
  });

  // development
  const pages = await browser.pages();
  const page = pages[0];

  // production
  //const page = await browser.newPage();
  //await upload(page);

  const modal = await page.$('#dialog.ytcp-uploads-dialog')

  await insertTitle(modal, 'hello title');
  await insertDescription(modal, 'this is the description');

  await tickKids(modal);

  // click more options
  const advancedBtn = await modal.$('.advanced-button');
  await advancedBtn.click();

  await insertTags(modal, 'onetag,anotherone,athirdone,');

  await nextStep(modal);
  await nextStep(modal);

  await clickPublic(modal);

  await done(modal);
}


main();
