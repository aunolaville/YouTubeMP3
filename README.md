# YouTubeMp3
 Convert Youtube videos to MP3 (audio) or MP4 (video) files.
 Downloading is done by [yt-dlp](https://github.com/yt-dlp/yt-dlp), conversion by FFmpeg.

## Prerequisites
[Node.js](https://nodejs.org/en) installed (v20.6.0 or newer)
<br>[FFmpeg](https://www.gyan.dev/ffmpeg/builds/) "installed"
<br>`yt-dlp.exe` in the project folder next to `app-mp3.js` (see [Updating yt-dlp](#updating-yt-dlp--if-downloads-stop-working))
## FFmpeg "installation"
Download ffmpeg-git-full.7z
<br>Unzip somewhere e.g. root of D:
<br>Add that path e.g. D:\FFmpeg\bin to path environment
<br>(Settings -> About -> Advanced system settings --> Environment Variables... --> Path --> Edit --> New --> D:\FFmpeg\bin ---> OK -> OK -> OK)

## Setup
Clone repository / Download ZIP & unzip somewhere
<br>Open command line and install packages
```bash
cd C:\Users\user\path\to\the\folder\YouTubeMP3
```
```bash
npm install
```
Then download `yt-dlp.exe` into the project folder:
```bash
curl.exe -L -o yt-dlp.exe https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe
```
## Usage
Folder name and audio bit rate can be changed in .env file

| Variable | Default | Description |
|----------|---------|-------------|
| `FOLDER_NAME` | `converted_files` | Output folder (created if missing) |
| `AUDIO_BIT_RATE` | `320` | mp3 bitrate in kbit/s |

Run `download-mp3.bat` (audio) or `download-mp4.bat` (video, H.264 + AAC)
<br>Or open command line and start the app
```bash
cd C:\Users\user\path\to\the\folder\YouTubeMP3
```
```bash
node --env-file=.env app-mp3.js
```
```bash
node --env-file=.env app-mp4.js
```
Copy and paste url of YouTube video (playlist links download only the single video)
<br>File is downloaded and saved to "converted_files" by default
<br>The app asks for the next url after each download
<br>Press ctrl + C when you want to exit

## Updating yt-dlp / if downloads stop working
YouTube changes often and breaks downloaders. **Update yt-dlp first:**
```bash
cd C:\Users\user\path\to\the\folder\YouTubeMP3
```
```bash
yt-dlp.exe -U
```
If the update fails or `yt-dlp.exe` is missing, download it again with the `curl.exe` command from the Setup section.

## Files
- `app-mp3.js`, `app-mp4.js` - the command line apps
- `yt-helper.js` - runs `yt-dlp.exe` with the right arguments
- `yt-dlp.exe` - the downloader (Windows binary, no Python needed)

## History
The project used `@distube/ytdl-core`, which broke when YouTube changed. `youtubei.js` was tried next but got HTTP 403 on some videos, so the project now uses yt-dlp.
