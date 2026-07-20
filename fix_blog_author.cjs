const fs = require('fs');
let content = fs.readFileSync('src/components/BlogPage.tsx', 'utf8');

content = content.replace(
  /author: 'Tim Indiekraf'/g,
  "author: language === 'id' ? 'Tim Indiekraf' : 'Indiekraf Team'"
);

fs.writeFileSync('src/components/BlogPage.tsx', content);
console.log("Author updated");
