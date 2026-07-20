const mysql = require('mysql2/promise');
require('dotenv').config();

const WA_LINK = 'https://api.whatsapp.com/send/?phone=6282337576338&text&type=phone_number&app_absent=0';

async function updateDB() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'indiekraf_db'
  });

  // Update all btn_link to WA_LINK where it's not a mailto link
  await connection.query("UPDATE pricing_plans SET btn_link = ? WHERE btn_link IS NULL OR btn_link = '' OR btn_link NOT LIKE '%mailto:%'", [WA_LINK]);

  console.log("DB Updated");
  await connection.end();
}

updateDB();
