import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function initAdmin() {
  const password = process.argv[2] || 'indiekraf2024';
  const username = process.argv[3] || 'admin';

  const hash = await bcrypt.hash(password, 10);

  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'indiekraf_db',
  });

  await conn.execute(
    'INSERT INTO admin_users (username, password_hash, name) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE password_hash = ?',
    [username, hash, 'Administrator', hash]
  );

  console.log(`✅ Admin user "${username}" berhasil dibuat/diperbarui.`);
  console.log(`   Password: ${password}`);
  console.log(`   Hash: ${hash}`);

  await conn.end();
}

initAdmin().catch(console.error);
