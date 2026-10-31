import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ytDlpPath = path.join(__dirname, 'yt-dlp.exe');

/* Runs yt-dlp (update it with "yt-dlp.exe -U"), progress is printed to the console */
export const runYtDlp = (videoUrl, saveLocation, formatArgs) =>
  new Promise((resolve, reject) => {
    const args = [
      '--no-playlist',
      '--windows-filenames',
      '--newline',
      '-o', path.join(__dirname, saveLocation, '%(title)s.%(ext)s'),
      ...formatArgs,
      videoUrl.trim()
    ];
    const child = spawn(ytDlpPath, args, { stdio: 'inherit' });
    child.on('error', (err) => reject(new Error(
      err.code === 'ENOENT' ? `yt-dlp.exe not found in ${__dirname}` : err.message)));
    child.on('close', (code) =>
      code === 0 ? resolve() : reject(new Error(`yt-dlp exited with code ${code}`)));
  });
