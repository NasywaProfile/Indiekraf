const fs = require('fs');
let content = fs.readFileSync('src/components/ContactPage.tsx', 'utf8');

// Replace mapPosition
content = content.replace(
  'const mapPosition = { lat: -7.978474, lng: 112.629395 }; // Telkom AI Center Malang (approx)',
  'const mapPosition = { lat: -7.9581746, lng: 112.6069905 }; // Telkom AI Center Malang'
);

// Replace href
content = content.replace(
  'href={`https://www.google.com/maps/dir/?api=1&destination=${mapPosition.lat},${mapPosition.lng}`}',
  'href="https://www.google.com/maps/search/telkom+ai+center+malang/@-7.9581746,112.6069905,13.55z?entry=ttu&g_ep=EgoyMDI2MDcxMi4wIKXMDSoASAFQAw%3D%3D"'
);

fs.writeFileSync('src/components/ContactPage.tsx', content);
