const fs = require('fs');
let content = fs.readFileSync('src/components/PortfolioPage.tsx', 'utf8');

content = content.replace(
  "const filters = [",
  `const filterTranslations: Record<string, { id: string, en: string }> = {
    'Website & Web Apps': { id: 'Website & Web Apps', en: 'Website & Web Apps' },
    'Branding & Identitas': { id: 'Branding & Identitas', en: 'Branding & Identity' },
    'Digital Marketing': { id: 'Digital Marketing', en: 'Digital Marketing' },
    'Event & Academy': { id: 'Event & Academy', en: 'Event & Academy' }
  };
  const filters = [`
);

content = content.replace(
  `{ id: 'website', label: 'Website & Web Apps' }`,
  `{ id: 'website', label: 'Website & Web Apps' }`
);
content = content.replace(
  `{ id: 'branding', label: 'Branding & Identitas' }`,
  `{ id: 'branding', label: language === 'id' ? 'Branding & Identitas' : 'Branding & Identity' }`
);

fs.writeFileSync('src/components/PortfolioPage.tsx', content);
