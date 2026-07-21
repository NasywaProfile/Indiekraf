import express from 'express';
import nodemailer from 'nodemailer';
import pool from '../db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, whatsapp, service, details } = req.body;

  if (!name || !email || !whatsapp || !service || !details) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Load dynamic destination email from site settings
  let destinationEmail = 'fikar@indiekraf.com';
  try {
    const [rows] = await pool.query('SELECT `value` FROM site_settings WHERE `key` = ?', ['email_destination_contact']) as any;
    if (rows.length > 0 && rows[0].value) {
      destinationEmail = rows[0].value;
    }
  } catch (dbErr) {
    console.warn('Error reading destination email setting from DB:', dbErr);
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || '587');
  const smtpSecure = process.env.SMTP_SECURE === 'true';
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const smtpFromEmail = process.env.SMTP_FROM_EMAIL || 'no-reply@indiekraf.com';
  const smtpFromName = process.env.SMTP_FROM_NAME || 'Indiekraf Website';

  console.log(`[Contact Submission] Received brief from: ${name} (${email}) (sending to: ${destinationEmail})`);

  // Fallback mock mode
  if (!smtpHost || !smtpUser || !smtpPassword) {
    console.warn(
      '⚠️ SMTP configuration is incomplete. Skip sending actual contact email. ' +
      'Please check your SMTP_HOST, SMTP_USER, and SMTP_PASSWORD environment variables.'
    );
    return res.json({
      success: true,
      message: 'Brief logged successfully (mock/development mode).',
      data: { name, email, whatsapp, service, details }
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    const mailOptions = {
      from: `"${smtpFromName}" <${smtpFromEmail}>`,
      to: destinationEmail,
      subject: `[Brief Kolaborasi] Pengajuan Kolaborasi Baru dari ${name}`,
      text: `Halo,\n\nAda pengajuan kolaborasi/brief baru dari halaman Hubungi Kami website Indiekraf:\n\nNama: ${name}\nEmail: ${email}\nWhatsApp: ${whatsapp}\nLayanan: ${service}\nDetail:\n${details}\n\nSalam,\nSistem Website Indiekraf`,
      html: `
        <div style="font-family: sans-serif; padding: 25px; color: #333; line-height: 1.6; max-width: 650px; margin: 0 auto; border: 1px solid #f0f0f0; border-radius: 10px;">
          <h2 style="color: #0A2472; border-bottom: 2px solid #f0f0f0; padding-bottom: 12px; margin-top: 0;">🤝 Pengajuan Brief Kolaborasi Baru</h2>
          <p>Halo,</p>
          <p>Seseorang telah mengirimkan formulir brief kolaborasi baru dari halaman Hubungi Kami. Berikut adalah detail lengkapnya:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; width: 180px;">Nama Lengkap</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Alamat Email</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-family: monospace;">${email}</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Nomor WhatsApp</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-family: monospace;">${whatsapp}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Layanan Diinginkan</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; color: #0A2472; font-weight: bold;">${service}</td>
            </tr>
          </table>
 
          <div style="margin-top: 20px;">
            <p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; font-weight: bold; color: #64748b;">Detail Rencana / Pertanyaan Proyek</p>
            <div style="white-space: pre-wrap; background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; font-size: 13px; color: #334155;">
              ${details}
            </div>
          </div>
 
          <p style="margin-top: 35px; border-top: 1px solid #e2e8f0; padding-top: 15px; font-size: 11px; color: #94a3b8; text-align: center;">
            Pesan ini dikirim secara otomatis oleh Sistem Website Indiekraf.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✉️ Contact brief email successfully sent to ${destinationEmail}. Message ID: ${info.messageId}`);
    return res.json({ success: true });
  } catch (error) {
    console.error('❌ Failed to send contact brief email via SMTP:', error);
    return res.status(500).json({ error: 'Failed to process brief submission' });
  }
});

export default router;
