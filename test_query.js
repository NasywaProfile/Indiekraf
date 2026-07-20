import pool from './server/db.js';
pool.query("SELECT id, name, btn_link FROM pricing_plans").then(res => {
  console.log(res[0]);
  process.exit(0);
});
