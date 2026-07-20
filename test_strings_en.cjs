const fs = require('fs');
const files = fs.readdirSync('src/components').filter(f => f.endsWith('.tsx'));

const issues = [];
files.forEach(file => {
  const content = fs.readFileSync('src/components/' + file, 'utf8');
  const words = ['Service', 'About', 'Project', 'All', 'Price', 'Our'];
  
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    if (line.match(/>[^<]*[a-zA-Z]+[^<]*</) || line.match(/"[^"]*"/)) {
       if (!line.includes('language ===') && !line.includes('t(') && !line.includes('t.id') && !line.includes('t.en')) {
         words.forEach(word => {
            if (line.match(new RegExp('\\b' + word + '\\b'))) {
              issues.push(`${file}:${i + 1}: ${line.trim()}`);
            }
         });
       }
    }
  });
});
console.log(issues.join('\n'));
