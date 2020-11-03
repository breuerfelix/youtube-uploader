import {delay, goto} from './utils';

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

async function tickKids(modal) {
  const kids = await modal.$('[name="NOT_MADE_FOR_KIDS"]');
  const btnKids = await kids.$('#radioContainer');
  await btnKids.click()
}

async function clickPublic(modal) {
  const publicChoice = await modal.$('[name="PUBLIC"]');
  const btnPublic = await publicChoice.$('#radioContainer');
  await btnPublic.click();
}

async function done(modal) {
  const doneBtn = await modal.$('#done-button');
  await doneBtn.click();
  await delay(2);
}

export {
  upload,
  nextStep,
  insertTitle,
  insertDescription,
  insertTags,
  tickKids,
  clickPublic,
  done,
};
