import { existsSync, mkdirSync } from 'fs';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';
import path from 'path';
import ytdl from '@distube/ytdl-core';
import ffmpeg from 'fluent-ffmpeg';

/* Get the path to the file and the name of the current directory*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Values defined in .env file */
const bit_rate = Number(process.env.AUDIO_BIT_RATE) || 320;
const saveLocation = process.env.FOLDER_NAME || "converted_files";

/* invalid characters in file name */
const invalidCharsRegex = /[/\\?%*:|"<>]/g;

/* Create saveLocation folder if it doesnt exists yet */
if (!existsSync(path.join(__dirname, saveLocation))) {
  console.log("folder", saveLocation, "created!");
  mkdirSync(path.join(__dirname, saveLocation));
}

/* Create command line interface */
const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

/* Calculates the estimate completion of the download */
const calculateProgress = (loaded, durationInSeconds) => {
  const totalSizeGuess = (bit_rate * 1000 * durationInSeconds) / 8 / 1024;
  console.log(`${Math.round(loaded / totalSizeGuess * 100)}% downloaded`)
}

/* Main function that downloads the video and changes it to mp3 */
const downloadAndConvert = async (videoUrl) => {
  try {
    const videoInfo = await ytdl.getInfo(videoUrl);
    const fileName = `${videoInfo.videoDetails.title.replace(invalidCharsRegex, '_')}.mp3`;

    const durationInSeconds = videoInfo.videoDetails.lengthSeconds;

    const saveFileTo = `${saveLocation}/${fileName}`;

    console.log("Downloading", fileName, "...");

    const videoStream = ytdl(videoUrl, { quality: 'highestaudio' });

    ffmpeg(videoStream)
      .audioBitrate(bit_rate)
      .on('progress', p => { calculateProgress(p.targetSize, durationInSeconds) })
      .on('end', () => {
        console.log(fileName, "saved to", saveLocation);
        askYouTubeLink();
      })
      .save(saveFileTo);
  } catch (error) {
    console.error('Error:', error.message);
    rl.close();
  }
};

/* function to create a command line question */ 
const askYouTubeLink = () => {
  rl.question('Enter the YouTube video URL: ', (videoUrl) => {
    downloadAndConvert(videoUrl);
  });
}

askYouTubeLink(); // run this when app is started