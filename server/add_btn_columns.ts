import pool from './db';
pool.query(`
  ALTER TABLE pricing_plans
  ADD COLUMN IF NOT EXISTS btn_text_id VARCHAR(100),
  ADD COLUMN IF NOT EXISTS btn_text_en VARCHAR(100),
  ADD COLUMN IF NOT EXISTS btn_link VARCHAR(300)
`).then(() => {
  console.log('Columns btn added successfully');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
