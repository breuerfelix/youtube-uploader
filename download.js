import axios from 'axios';
import fs from 'fs';

async function downloadFile(url, outputFile) {
  // delete file if already exists
  if (fs.existsSync(outputFile)) {
    fs.unlinkSync(outputFile);
  }

  const writer = fs.createWriteStream(outputFile);
  const videoStream = await axios.get(url, {responseType: 'stream'});

  const data = videoStream.data;
  data.pipe(writer);

  return new Promise((resolve, reject) => {
    data.on('close', () => resolve());
    data.on('error', () => reject());
  })
}

async function getLatestVideo(endpoint) {
  axios.defaults.baseURL = endpoint;

  const res = await axios.get('/latest.txt');
  const ident = res.data;

  const latestFileName = 'latest.txt'
  if (fs.existsSync(latestFileName)) {
    const data = fs.readFileSync(latestFileName);

    // latest video is already uploaded
    if (data == ident) {
      console.log('latest video already uploaded!');
      return null;
    }
  }

  console.log('found new video ! downloading...');
  // fetch video data
  const videoDataRes = await axios.get(`${ident}/data.json`);
  const videoData = videoDataRes.data;

  const dataFileName = 'data.json';

  if (fs.existsSync(dataFileName)) {
    fs.unlinkSync(dataFileName);
  }

  fs.writeFileSync(dataFileName, JSON.stringify(videoData));

  // fetch video
  const videoPath = 'video.mp4';
  await downloadFile(`${ident}/merged.mp4`, videoPath);

  if (fs.existsSync(latestFileName)) {
    fs.unlinkSync(latestFileName);
  }

  fs.writeFileSync(latestFileName, ident);
  console.log('finished downloading!');

  return {
    data: dataFileName,
    file: videoPath,
  };
}

export {
  getLatestVideo,
};
