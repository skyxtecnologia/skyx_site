// Temporary script to copy media files
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sourceVideo = 'c:\\Users\\Tales Mancebo\\Downloads\\loop_backgrond.webm';
const sourceImage = 'c:\\Users\\Tales Mancebo\\AppData\\Roaming\\Code\\User\\globalStorage\\github.copilot-chat\\copilot-cli-images\\1779718822509-06wc8l1g.png';

const destVideo = path.join(__dirname, 'public', 'hero-bg.webm');
const destImage = path.join(__dirname, 'public', 'hero-bg.png');

try {
  if (fs.existsSync(sourceVideo)) {
    fs.copyFileSync(sourceVideo, destVideo);
    console.log(`✓ Copied video to ${destVideo}`);
  }
  
  if (fs.existsSync(sourceImage)) {
    fs.copyFileSync(sourceImage, destImage);
    console.log(`✓ Copied image to ${destImage}`);
  }
} catch (error) {
  console.error('Error copying files:', error.message);
}
