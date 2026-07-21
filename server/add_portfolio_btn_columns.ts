import pool from './db.js';

async function migrate() {
  const connection = await (pool as any).getConnection();
  try {
    await connection.query(`
      ALTER TABLE portfolio_items
        ADD COLUMN IF NOT EXISTS btn_text_id VARCHAR(255) NOT NULL DEFAULT '',
        ADD COLUMN IF NOT EXISTS btn_text_en VARCHAR(255) NOT NULL DEFAULT '',
        ADD COLUMN IF NOT EXISTS link_url VARCHAR(512) NOT NULL DEFAULT ''
    `);
    console.log('✅ Kolom btn_text_id, btn_text_en, link_url berhasil ditambahkan ke portfolio_items');
  } catch (err: any) {
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log('ℹ️  Kolom sudah ada, skip.');
    } else {
      console.error('❌ Gagal migrasi:', err.message);
    }
  } finally {
    connection.release();
    process.exit(0);
  }
}

migrate();
