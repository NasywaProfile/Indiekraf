import pool from './db';
pool.query(`
  ALTER TABLE pricing_plans
  ADD COLUMN IF NOT EXISTS name_en VARCHAR(200),
  ADD COLUMN IF NOT EXISTS subtitle_en VARCHAR(300),
  ADD COLUMN IF NOT EXISTS price_en VARCHAR(100),
  ADD COLUMN IF NOT EXISTS badge_en VARCHAR(50),
  ADD COLUMN IF NOT EXISTS bullets_en TEXT
`).then(() => {
  console.log('Columns added successfully');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
