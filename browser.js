import got from 'got';
import {spawn} from 'child_process';
import {delay} from './utils.js';

const debuggingPort = 9222;
const profileFolder = 'chrome-profile';
const executeable = process.env.BROWSER || 'google-chrome-stable';

async function launchBrowser(headless = false) {
  const launchArgs = [
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1200,800',
    '--disable-gpu',
    `--remote-debugging-port=${debuggingPort}`,
    `--user-data-dir=${profileFolder}`,
    '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36"',
  ];

  if (headless) {
    launchArgs.push('--headless');
  }

  const proc = spawn(executeable, launchArgs);

  let retry = 0;
  while (true) {
    try {
      const res = await got(`http://localhost:${debuggingPort}/json/version`).json();
      const browserWSEndpoint = res.webSocketDebuggerUrl;
      return {browserWSEndpoint, pid: proc.pid};
    } catch (e) {
      if (retry > 50) throw e;

      retry++;
      await delay(1);
    }
  }
}

export {
  launchBrowser,
};
