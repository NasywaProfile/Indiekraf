const fs = require('fs');
let content = fs.readFileSync('src/components/ContactPage.tsx', 'utf8');

// I will look for standard strings in ContactPage.tsx that might not be translated.
console.log(content.match(/"([^"]*)"/g));

