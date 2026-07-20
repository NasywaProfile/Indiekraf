const fs = require('fs');
const files = fs.readdirSync('src/components').filter(f => f.endsWith('.tsx'));

const issues = [];
files.forEach(file => {
  const content = fs.readFileSync('src/components/' + file, 'utf8');
  // Check for common words that might be hardcoded in Indonesian
  const indonesianWords = ['Layanan', 'Kami', 'Harga', 'Tentang', 'Proyek', 'Semua'];
  
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    // Only check lines that look like JSX text
    if (line.match(/>[^<]*[a-zA-Z]+[^<]*</) || line.match(/"[^"]*"/)) {
       // if it doesn't contain 'language ===' or 't('
       if (!line.includes('language ===') && !line.includes('t(') && !line.includes('t.id') && !line.includes('t.en')) {
         // check if it matches an indonesian word
         indonesianWords.forEach(word => {
            if (line.match(new RegExp('\\b' + word + '\\b'))) {
              issues.push(`${file}:${i + 1}: ${line.trim()}`);
            }
         });
       }
    }
  });
});
console.log(issues.join('\n'));
