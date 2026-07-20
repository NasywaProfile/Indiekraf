const fs = require('fs');
const path = require('path');

const dir = 'src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const unsplashRegex = /https:\/\/images\.unsplash\.com\/[^'"]+/g;
const picsumRegex = /https:\/\/picsum\.photos\/[^'"]+/g;
const iconKiriRegex = /\/icon-kiri\.png/g;
const iconKananRegex = /\/icon-kanan\.png/g;
const logoRegex = /\/logo\.png/g;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content.replace(unsplashRegex, '/gambar.jpg');
  content = content.replace(picsumRegex, '/gambar.jpg');
  content = content.replace(iconKiriRegex, '/gambar.jpg');
  content = content.replace(iconKananRegex, '/gambar.jpg');
  // I will also replace logo.png with gambar.jpg
  content = content.replace(logoRegex, '/gambar.jpg');
  
  fs.writeFileSync(filePath, content);
});

console.log("Images replaced");
