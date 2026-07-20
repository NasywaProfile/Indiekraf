const mysql = require('mysql2/promise');
async function run() {
  const c = await mysql.createConnection({host: 'localhost', user: 'root', password: '', database: 'indiekraf_db'});
  const [rows] = await c.query('SELECT name, price, badge FROM pricing_plans WHERE category="Pelatihan"');
  console.log(rows);
  process.exit(0);
}
run();
