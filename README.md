# YouTubeMp3
 Convert Youtube videos to MP3 files

## Prerequisites
[Node.js](https://nodejs.org/en) installed (v20.6.0 or newer)
<br>[FFmpeg](https://www.gyan.dev/ffmpeg/builds/) "installed"
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
## Usage
Folder name and audio bit rate can be changed in .env file
<br>Run start.bat
<br>Or open command line and start the app
```bash
cd C:\Users\user\path\to\the\folder\YouTubeMP3
```
```bash
node --env-file=.env app.js
```
Copy and paste url of YouTube video
<br>File is downloaded and saved to "converted_files" by default
<br>Press ctrl + C when you want to exit
