import puppeteer from 'puppeteer';
import {uploadVideo} from './youtube.js';
import {getLatestVideo} from './download.js';

// browser endpoint as first parameter
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('not enough arguments provided.');
  process.exit(0);
}

const browserWSEndpoint = args[0];
// default is 60 minutes
const interval = (Number(args[1]) || 7200) * 1000;

async function main() {
  console.log('running');
  const browser = await puppeteer.connect({
    browserWSEndpoint,
    // scale viewport to current windows size
    defaultViewport: null,
  });

  // create new page
  //const page = await browser.newPage();
  // use existing site
  const pages = await browser.pages();
  const page = pages[0];
  page.setDefaultTimeout(60000);
  page.setDefaultNavigationTimeout(60000);

  const video = await getLatestVideo();

  if (video != null) {
    const { data, file } = video;
    console.log('uploading video: ' + data.title);
    await uploadVideo(page, data, file);
  }

  console.log('going to sleep');
  // reschedule
  setTimeout(main, interval);
}

main();
