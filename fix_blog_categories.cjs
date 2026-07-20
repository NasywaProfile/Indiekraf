const fs = require('fs');
let content = fs.readFileSync('src/components/BlogPage.tsx', 'utf8');

content = content.replace(
  "const categories = [",
  `const categoryTranslations: Record<string, { id: string, en: string }> = {
    'Industri Game': { id: 'Industri Game', en: 'Game Industry' },
    'Tech & Startup': { id: 'Tech & Startup', en: 'Tech & Startup' },
    'Desain & Branding': { id: 'Desain & Branding', en: 'Design & Branding' },
    'Ekonomi Kreatif': { id: 'Ekonomi Kreatif', en: 'Creative Economy' }
  };
  const categories = [`
);

content = content.replace(
  `{ id: 'game', label: 'Industri Game' }`,
  `{ id: 'game', label: language === 'id' ? 'Industri Game' : 'Game Industry' }`
);
content = content.replace(
  `{ id: 'tech', label: 'Tech & Startup' }`,
  `{ id: 'tech', label: 'Tech & Startup' }`
);
content = content.replace(
  `{ id: 'design', label: 'Desain & Branding' }`,
  `{ id: 'design', label: language === 'id' ? 'Desain & Branding' : 'Design & Branding' }`
);
content = content.replace(
  `{ id: 'economy', label: 'Ekonomi Kreatif' }`,
  `{ id: 'economy', label: language === 'id' ? 'Ekonomi Kreatif' : 'Creative Economy' }`
);

fs.writeFileSync('src/components/BlogPage.tsx', content);
