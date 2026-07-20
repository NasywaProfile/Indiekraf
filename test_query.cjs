const mysql = require('mysql2/promise');
require('dotenv').config();

async function check() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'indiekraf_db'
  });
  const [rows] = await connection.query("SELECT id, category, name, price, subtitle, bullets FROM pricing_plans");
  console.log(JSON.stringify(rows, null, 2));
  await connection.end();
}
check();
