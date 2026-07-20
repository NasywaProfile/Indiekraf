const fs = require('fs');
let content = fs.readFileSync('src/components/ContactPage.tsx', 'utf8');

// Replace services
content = content.replace(
  `  const services = [
    'Indiekraf Media (Publishing & Ads)',
    'Indiekraf Studio (Website & Branding)',
    'Indiekraf Academy (Training & SDM)',
    'Indiekraf Insight (Research & Data)'
  ];`,
  `  const services = language === 'id' ? [
    'Indiekraf Media (Publishing & Ads)',
    'Indiekraf Studio (Website & Branding)',
    'Indiekraf Academy (Training & SDM)',
    'Indiekraf Insight (Research & Data)'
  ] : [
    'Indiekraf Media (Publishing & Ads)',
    'Indiekraf Studio (Website & Branding)',
    'Indiekraf Academy (Training & HR)',
    'Indiekraf Insight (Research & Data)'
  ];`
);

fs.writeFileSync('src/components/ContactPage.tsx', content);

