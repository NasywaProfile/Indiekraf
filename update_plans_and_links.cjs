const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function main() {
  const WA_LINK = 'https://api.whatsapp.com/send/?phone=6282337576338&text&type=phone_number&app_absent=0';

  // 1. Update DB Pricing Plans
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'indiekraf_db'
  });

  // Pelatihan Pricing Plans (According to Screenshot 1)
  const plans = [
    {
      name: 'Penanganan Media Sosial',
      price: 'Rp 5.000.000',
      bullets: JSON.stringify(['Materi PDF', 'Studi kasus nyata', 'Sertifikat digital'])
    },
    {
      name: 'Intermediate Class',
      price: 'Rp 2.400.000',
      bullets: JSON.stringify(['Hands-on praktek langsung', 'Template iklan premium', 'Akses komunitas diskusi'])
    },
    {
      name: 'Advanced Mastery',
      price: 'Rp 5.000.000',
      bullets: JSON.stringify(['Projek riil industri', 'Mentoring 1-on-1 eksklusif', 'Sertifikat keahlian profesional'])
    },
    {
      name: 'Bootcamp Intensif',
      price: 'Rp 7.000.000',
      bullets: JSON.stringify(['Full kurikulum lengkap', 'Simulasi kampanye berbayar', 'Bimbingan karir & portofolio', 'Afterclass support lifetime'])
    }
  ];

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
        '', 
        '', 
        p.price, 
        p.price, 
        '', 
        '', 
        'blue', 
        p.bullets, 
        p.bullets, 
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
        if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('dist')) {
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

    const newContent = content.replace(/href=["'](https?:\/\/(wa\.me|api\.whatsapp\.com)[^"']*)["']/gi, (match, p1) => {
      if (p1 !== WA_LINK && !match.includes('fikar@indiekraf.com')) {
        changed = true;
        return `href="${WA_LINK}"`;
      }
      return match;
    });

    if (newContent !== content) {
        content = newContent;
        changed = true;
    }

    if (changed) {
      fs.writeFileSync(file, content);
      console.log('Updated file:', file);
    }
  });
}

main().catch(console.error);
