const mysql = require('mysql2/promise');
require('dotenv').config();

async function check() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'indiekraf_db'
  });
  const [rows] = await connection.query("SELECT * FROM site_settings WHERE `key` = 'pricing_categories_data'");
  console.log(rows[0] ? rows[0].value : 'None');
  await connection.end();
}
check();
