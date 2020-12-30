import {launchBrowser} from './browser.js';
import {upload} from './upload.js';
import {getLatestVideo} from './download.js';

const args = process.argv.slice(2);
const interval = 10 * 60 * 1000; // 10 minutes

async function auto(videoEndpoint) {
  let video = null;
  try {
    video = await getLatestVideo(videoEndpoint);
  } catch(e) {
    console.error('error downloading new video', e);
    video = null;
  }

  if (video != null) {
    const { file, data } = video;
    await upload(file, data);
  }

  setTimeout(() => auto(videoEndpoint), interval);
}

switch (args[0]) {
  case 'init':
    // function is used to login to google and choose
    // the correct youtube brand account
    // afterwards the program can be used in headless mode
    console.log('Please login to your YouTube Account.');
    // TODO headless does not open youtube when logged in to google
    launchBrowser(false);

  case 'upload':
    console.log('Uploading video ...');
    const videoPath = args[1];
    const dataPath = args[2];
    upload(videoPath, dataPath);

  case 'th':
    console.log('Uploading video ...');
    const videoEndpoint = args[1];
    auto(videoEndpoint);
}
