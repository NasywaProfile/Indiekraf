const fs = require('fs');
let content = fs.readFileSync('src/components/ContactPage.tsx', 'utf8');

content = content.replace(/import \{ APIProvider, Map, AdvancedMarker, Pin \} from '@vis\.gl\/react-google-maps';\n/g, '');
content = content.replace(/const GOOGLE_MAPS_API_KEY = process\.env\.GOOGLE_MAPS_PLATFORM_KEY \|\| '';\n/g, '');

fs.writeFileSync('src/components/ContactPage.tsx', content);
