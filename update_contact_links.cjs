const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function main() {
  const WA_LINK = 'https://api.whatsapp.com/send/?phone=6282337576338&text&type=phone_number&app_absent=0';
  const EMAIL = 'fikar@indiekraf.com';

  // 1. Update DB Pricing Plans
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'indiekraf_db'
  });

  // Pelatihan Pricing Plans (According to Screenshot 2)
  const plans = [
    {
      name: 'Social Media Handling',
      price: 'Rp 5.000.000',
      subtitle: '/ Bulan'
    },
    {
      name: 'Social Media Consulting',
      price: 'Rp 500.000',
      subtitle: '/ Session'
    },
    {
      name: 'Content Writer & SEO',
      price: 'Rp 1.500.000',
      subtitle: '/ 5 Konten Artikel'
    },
    {
      name: 'Video Reels / Content',
      price: 'Rp 500.000',
      subtitle: '/ Content'
    },
    {
      name: 'E-Commerce Handling',
      price: 'Rp 5.000.000',
      subtitle: '/ Bulan'
    },
    {
      name: 'Live Streaming & Zoom Meeting',
      price: 'Rp 500.000',
      subtitle: '/ Session'
    }
  ];

  // Update existing Pelatihan plans or delete/insert new ones
  // We'll update the first 4, then insert the rest, or just delete all and insert.
  await connection.query("DELETE FROM pricing_plans WHERE category='Pelatihan'");

  for (let i = 0; i < plans.length; i++) {
    const p = plans[i];
    await connection.query(
      `INSERT INTO pricing_plans 
        (slug, name, name_en, subtitle, subtitle_en, price, price_en, badge, badge_en, color_theme, bullets, bullets_en, category, sort_order, btn_text_id, btn_text_en, btn_link, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'pelatihan-' + i, 
        p.name, 
        p.name, 
        p.subtitle, 
        p.subtitle, 
        p.price, 
        p.price, 
        '', 
        '', 
        'blue', 
        '[]', 
        '[]', 
        'Pelatihan', 
        i, 
        'Hubungi Kami', 
        'Contact Us', 
        WA_LINK,
        1
      ]
    );
  }

  // Update all btn_link in pricing_plans to use WA link (except if it's an email link for some reason)
  await connection.query("UPDATE pricing_plans SET btn_link = ? WHERE btn_link NOT LIKE '%mailto:%'", [WA_LINK]);

  console.log("DB Updated");
  await connection.end();

  // 2. Replace WA links in frontend files
  function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(f => {
      const file = path.join(dir, f);
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        if (!file.includes('node_modules') && !file.includes('.git')) {
          results = results.concat(walk(file));
        }
      } else {
        if (file.endsWith('.tsx') || file.endsWith('.ts')) {
          results.push(file);
        }
      }
    });
    return results;
  }

  const files = walk('./web/src');
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Replace all wa.me and api.whatsapp.com links that are not the new one
    // Also change Hubungi kami buttons that don't have links
    const newContent = content.replace(/href=["'](https?:\/\/(wa\.me|api\.whatsapp\.com)[^"']*)["']/gi, (match, p1) => {
      if (p1 !== WA_LINK) {
        changed = true;
        return `href="${WA_LINK}"`;
      }
      return match;
    });

    if (newContent !== content) {
        content = newContent;
    }

    if (changed) {
      fs.writeFileSync(file, content);
      console.log('Updated file:', file);
    }
  });

}

main().catch(console.error);
