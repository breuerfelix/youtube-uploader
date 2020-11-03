import puppeteer from 'puppeteer';

const browserWSEndpoint = process.argv.slice(2)[0];
//const endpoint = 'ws://127.0.0.1:9222/devtools/browser/1b25023b-1dfc-4a05-9ad4-776bf369b23d';

async function goto(page, url) {
  await page.goto(url, { waitUntil: 'networkidle0' });
}

function delay(time) {
   return new Promise(function(resolve) { 
       setTimeout(resolve, time * 1000)
   });
}

async function upload(page) {
  await goto(page, 'https://studio.youtube.com');
  await delay(5);
  await page.click('#create-icon');
  await delay(1);
  await page.click('#text-item-0');
  await delay(2);
  const fileInput = await page.$('input[type=file]');
  await fileInput.uploadFile('./merged.mp4');
  await delay(10);
}

async function nextStep(modal) {
  const nextBtn = await modal.$('#next-button');
  await nextBtn.click();
  await delay(2);
}

async function insertTitle(modal, text) {
  const title = await modal.$('.title-textarea');
  const titleInput = await title.$('#textbox');
  for (let i = 0; i < 25; i++) {
    // delete all existing input
    await titleInput.press('Backspace');
  }
  await titleInput.type(text);
}

async function insertDescription(modal, text) {
  const description = await modal.$('.description-textarea');
  const descriptionInput = await description.$('#textbox');
  await descriptionInput.type(text);
}

async function insertTags(modal, text) {
  const tagsContainer = await modal.$('#tags-container');
  const tagsInput = await tagsContainer.$('#text-input');
  await tagsInput.type(text);
}

async function main() {
  const browser = await puppeteer.connect({
    browserWSEndpoint,
    defaultViewport: null,
  });

  //const page = await browser.newPage();
  // for development
  const pages = await browser.pages();
  const page = pages[0];

  // production
  //await upload(page);

  const modal = await page.$('#dialog.ytcp-uploads-dialog')

  await insertTitle(modal, 'hello title');
  await insertDescription(modal, 'this is the description');

  const kids = await modal.$('[name="NOT_MADE_FOR_KIDS"]');
  const btnKids = await kids.$('#radioContainer');
  await btnKids.click()

  // click more options
  const advancedBtn = await modal.$('.advanced-button');
  await advancedBtn.click();

  await insertTags(modal, 'onetag,anotherone,athirdone,');

  await nextStep(modal);
  await nextStep(modal);
  const publicChoice = await modal.$('[name="PUBLIC"]');
  const btnPublic = await publicChoice.$('#radioContainer');
  await btnPublic.click();

  const doneBtn = await modal.$('#done-button');
  await doneBtn.click();
  await delay(2);
}


main();
