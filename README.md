# Youtube Video Uploader

This small script uploads a video to YouTube.  
I programmed this, because with the official YouTube API you are not able to upload videos PUBLIC unless you have a YouTube verified API (which I do not have).

## Flow

### Setup

Run `npm install` to install all dependencies.

```bash
BROWSER=google-chrome-stable node cli.js init
```

After running this command, a browser should pop up and you have to manually login to your YouTube Account.  
This creates a `chrome-profile` folder.  
The `BROWSER` environment variable specifies your chrome or chromium binary name.

### Uploading

```bash
node cli.js upload video.mp4 data.json
```

`video.mp4` is the path to your video to upload.  
`data.json` is the path to a file with all video meta data. Have a look at this sample file:
```json
{
  "title": "Week 53 - Dota 2 - Top 5 Twitch Highlights 2020",
  "description": "00:00 - worst way to die in dota\n00:08 - Two-time TI Winner\n01:08 - RTZ vs Gunnar\n01:45 - Gunnar dodges Bulba's Laguna\n02:11 - Sadge \n",
  "tags": "twitch highlight week53 dota2 gorgc bigdaddy gunnardota2 gunnardota2 raeyei"
}
```

The script waits till the upload is complete and automatically closes the browser window again.

## FAQ

__Why doesn't this run in headless mode?__  
I didn't manage to get it working. Once you are logged in to your YouTube account, youtube.com won't load anymore.  
If you manage to get it working (at least the uploading part) in headless mode, I would love to see a PR or an Email!
