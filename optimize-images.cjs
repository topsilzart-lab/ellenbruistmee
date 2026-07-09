const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const assetsDir = path.join(__dirname, 'src', 'assets');
const images = [
  { file: 'hero.png',          quality: 80 },
  { file: 'logo.jpg',          quality: 75 },
  { file: 'ellen-over-1.jpg',  quality: 80 },
  { file: 'ellen-over-2.jpg',  quality: 80 },
  { file: 'ellen-contact.jpg', quality: 80 },
  { file: 'ellen-reis.jpg',    quality: 80 },
];

(async () => {
  for (const { file, quality } of images) {
    const input = path.join(assetsDir, file);
    const outName = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const output = path.join(assetsDir, outName);
    const before = fs.statSync(input).size;
    await sharp(input).webp({ quality }).toFile(output);
    const after = fs.statSync(output).size;
    console.log(`${file} → ${outName}: ${(before/1024).toFixed(0)}kB → ${(after/1024).toFixed(0)}kB`);
  }
})();
