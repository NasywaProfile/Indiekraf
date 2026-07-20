import pool from './db.js';

async function updateDb() {
  try {
    await pool.query(`ALTER TABLE pricing_plans ADD COLUMN category_title VARCHAR(255) DEFAULT '';`);
    await pool.query(`ALTER TABLE pricing_plans ADD COLUMN category_title_en VARCHAR(255) DEFAULT '';`);
    await pool.query(`ALTER TABLE pricing_plans ADD COLUMN category_subtitle VARCHAR(255) DEFAULT '';`);
    await pool.query(`ALTER TABLE pricing_plans ADD COLUMN category_subtitle_en VARCHAR(255) DEFAULT '';`);
    await pool.query(`ALTER TABLE pricing_plans ADD COLUMN category_icon VARCHAR(50) DEFAULT 'Target';`);
    console.log("Success");
  } catch (e) {
    console.error(e);
  }
  process.exit();
}

updateDb();
