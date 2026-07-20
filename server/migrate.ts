import pool from './db.js';

async function migrate() {
  try {
    await pool.query('ALTER TABLE pricing_plans ADD COLUMN name_en VARCHAR(200) AFTER name');
    await pool.query('ALTER TABLE pricing_plans ADD COLUMN subtitle_en VARCHAR(300) AFTER subtitle');
    await pool.query('ALTER TABLE pricing_plans ADD COLUMN price_en VARCHAR(100) AFTER price');
    await pool.query('ALTER TABLE pricing_plans ADD COLUMN badge_en VARCHAR(50) AFTER badge');
    await pool.query('ALTER TABLE pricing_plans ADD COLUMN bullets_en TEXT AFTER bullets');
    console.log('Migration successful');
  } catch (err: any) {
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log('Columns already exist');
    } else {
      console.error('Error during migration:', err);
    }
  }
  process.exit();
}

migrate();
