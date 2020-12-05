# Youtube Video Uploader

This small script uploads a video to YouTube.  
I programmed this because with the official YouTube API you are not able to upload videos PUBLIC unless you have a YouTube verified API (which I do not have).

In the current state it is programmed to fit 100% into my use-case BUT... if you know a little JavaScript it should be easy to extract everything you need. (Hint: `youtube.js`)

If there is a huge interest in making this a standalone upload script / cli / whatever, just let me know and I will try my best to put some more hours into this project and make it pretty.

### Flow

Run `bash start.sh google-chrome-stable` (replace `google-chrome-stable` with the name of your chrome / chromium binary) and wait until the browser opens. Login to Google and make sure to switch to the correct YouTube Account (if you only have one, just forget this).  
Copy the Remote Address Link from the terminal which got printed right after running the bash script.  
Run `node index.js <remote address link> <remote video server>` to start uploading. The script will control the browser window.

Currently `<remote video server>` is a file server where the script asks every hour if it has a new video to upload. This is how I needed the script to be but again... could be changed in the future :)
