import {delay, goto} from './utils.js';

async function upload(page, file) {
  await goto(page, 'https://studio.youtube.com');
  console.log('navigation done to youtube studio');
  await delay(10);
  await page.click('#create-icon');
  await delay(5);
  await page.click('#text-item-0');
  await delay(5);
  const fileInput = await page.$('input[type=file]');
  await fileInput.uploadFile(file);
  await delay(10);
}

async function nextStep(modal) {
  const nextBtn = await modal.$('#next-button');
  await nextBtn.click();
  await delay(5);
}

async function insertTitle(modal, text) {
  const title = await modal.$('.title-textarea');
  const titleInput = await title.$('#textbox');
  for (let i = 0; i < 25; i++) {
    // delete all existing input
    await titleInput.press('Backspace');
  }

  await titleInput.type(text);
  await delay(5);
}

async function insertDescription(modal, text) {
  const description = await modal.$('.description-textarea');
  const descriptionInput = await description.$('#textbox');
  await descriptionInput.type(text);
  await delay(5);
}

async function insertTags(modal, text) {
  const tagsContainer = await modal.$('#tags-container');
  const tagsInput = await tagsContainer.$('#text-input');
  await tagsInput.type(text);
  await delay(5);
}

async function tickKids(modal) {
  const kids = await modal.$('[name="NOT_MADE_FOR_KIDS"]');
  const btnKids = await kids.$('#radioContainer');
  await btnKids.click()
  await delay(5);
}

async function clickPublic(modal) {
  const publicChoice = await modal.$('[name="PUBLIC"]');
  const btnPublic = await publicChoice.$('#radioContainer');
  await btnPublic.click();
  await delay(5);
}

async function done(modal) {
  const doneBtn = await modal.$('#done-button');
  await doneBtn.click();
  await delay(5);
}

async function uploadVideo(page, data, file) {
  await upload(page, file);

  const modal = await page.$('#dialog.ytcp-uploads-dialog')

  const { title, description, tags } = data;
  await insertTitle(modal, title);
  await insertDescription(modal, description);

  await tickKids(modal);

  // click more options
  const advancedBtn = await modal.$('.advanced-button');
  await advancedBtn.click();
  await delay(5);

  await insertTags(modal, tags.replace(/ /g, ',') + ',');

  await nextStep(modal);
  await nextStep(modal);

  await clickPublic(modal);

  await done(modal);
}

export {
  uploadVideo,
};
