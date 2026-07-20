const fs = require('fs');
let content = fs.readFileSync('src/components/ContactPage.tsx', 'utf8');

// Remove opening APIProvider
content = content.replace(/<APIProvider[^>]*>\s*/, '');
// Remove closing APIProvider
content = content.replace(/\s*<\/APIProvider>/, '');

fs.writeFileSync('src/components/ContactPage.tsx', content);
