import {launchBrowser} from './browser.js';
import puppeteer from 'puppeteer';
import fs from 'fs';
import kill from 'tree-kill';
import {uploadVideo} from './youtube.js';
import {delay} from './utils.js';

async function upload(videoPath, dataPath) {
  const rawData = fs.readFileSync(dataPath, 'utf8');
  const data = JSON.parse(rawData);

  const {browserWSEndpoint, pid} = await launchBrowser(false);
  await delay(20);

  const browser = await puppeteer.connect({
    browserWSEndpoint,
    // scale viewport to current windows size
    defaultViewport: null,
  });

  const pages = await browser.pages();
  const page = pages[0];
  page.setDefaultTimeout(60 * 1000);
  page.setDefaultNavigationTimeout(60 * 1000);

  await uploadVideo(page, data, videoPath);
  kill(pid);
}

export {
  upload,
};
