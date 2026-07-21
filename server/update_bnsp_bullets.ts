import pool from './db.js';

const bullets = [
  'Sertifikat Profesi BNSP',
  'Sertifikat Kegiatan oleh Indiekraf',
  'Konsumsi',
  '1 Orang Narasumber, 1 Orang Penguji',
  'Minimal 10 Peserta',
  '1 Hari Training + 1 Hari Uji Sertifikasi',
];

const bullets_en = [
  'BNSP Professional Certificate',
  'Activity Certificate by Indiekraf',
  'Meals & Refreshments',
  '1 Speaker, 1 Assessor',
  'Minimum 10 Participants',
  '1 Day Training + 1 Day Certification Exam',
];

async function update() {
  try {
    const [rows] = await pool.query(
      `SELECT id, name FROM pricing_plans WHERE category = 'Workshop + Sertifikasi BNSP'`
    ) as any;

    if (rows.length === 0) {
      console.log('Tidak ada paket ditemukan di kategori "Workshop + Sertifikasi BNSP".');
      process.exit(0);
    }

    console.log(`Ditemukan ${rows.length} paket. Mengupdate bullets...`);

    for (const row of rows) {
      await pool.query(
        `UPDATE pricing_plans SET bullets = ?, bullets_en = ? WHERE id = ?`,
        [JSON.stringify(bullets), JSON.stringify(bullets_en), row.id]
      );
      console.log(`  ✓ Updated: ${row.name}`);
    }

    console.log('\nSemua paket berhasil diupdate!');
  } catch (err) {
    console.error('Error:', err);
  }
  process.exit(0);
}

update();
