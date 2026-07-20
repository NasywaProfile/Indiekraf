const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Find the ContactPage condition
content = content.replace(
  /currentPage === 'contact' \? \(\s*<ContactPage \/>\s*\)/,
  `currentPage === 'contact' ? (
            <>
              <ContactPage />
              {/* Section 7: Let's Work Together (CTA) */}
              <div id="contact-cta" className="relative z-30 bg-white">
                <CTA isCombined={false} />
              </div>
            </>
          )`
);

fs.writeFileSync('src/App.tsx', content);
