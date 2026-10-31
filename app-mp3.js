import { existsSync, mkdirSync } from 'fs';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';
import path from 'path';
import { runYtDlp } from './yt-helper.js';

/* Get the path to the file and the name of the current directory*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Values defined in .env file */
const bit_rate = Number(process.env.AUDIO_BIT_RATE) || 320;
const saveLocation = process.env.FOLDER_NAME || "converted_files";

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

/* Downloads the video's audio and converts it to mp3 */
const downloadAndConvert = async (videoUrl) => {
  try {
    await runYtDlp(videoUrl, saveLocation, [
      '-f', 'bestaudio',
      '-x',
      '--audio-format', 'mp3',
      '--audio-quality', `${bit_rate}K`
    ]);
    console.log("Saved to", saveLocation);
  } catch (error) {
    console.error('Error:', error.message);
  }
  askYouTubeLink();
};

/* function to create a command line question */ 
const askYouTubeLink = () => {
  rl.question('Enter the YouTube video URL: ', (videoUrl) => {
    downloadAndConvert(videoUrl);
  });
}

askYouTubeLink(); // run this when app is started
