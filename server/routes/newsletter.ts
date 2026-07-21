import express from 'express';
import nodemailer from 'nodemailer';
import pool from '../db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Load dynamic destination email from site settings
  let destinationEmail = 'fikar@indiekraf.com';
  try {
    const [rows] = await pool.query('SELECT `value` FROM site_settings WHERE `key` = ?', ['email_destination_newsletter']) as any;
    if (rows.length > 0 && rows[0].value) {
      destinationEmail = rows[0].value;
    }
  } catch (dbErr) {
    console.warn('Error reading destination email setting from DB:', dbErr);
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || '587');
  const smtpSecure = process.env.SMTP_SECURE === 'true'; // true for 465, false for other ports
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const smtpFromEmail = process.env.SMTP_FROM_EMAIL || 'no-reply@indiekraf.com';
  const smtpFromName = process.env.SMTP_FROM_NAME || 'Indiekraf Website';

  // Output to console for quick verification
  console.log(`[Newsletter Submission] New registration request for email: ${email} (sending to: ${destinationEmail})`);

  // If SMTP settings are not provided, we run in fallback mock mode
  if (!smtpHost || !smtpUser || !smtpPassword) {
    console.warn(
      '⚠️ SMTP configuration is incomplete. Skip sending actual email. ' +
      'Please check your SMTP_HOST, SMTP_USER, and SMTP_PASSWORD environment variables.'
    );
    return res.json({
      success: true,
      message: 'Subscription logged successfully (mock/development mode).'
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
      subject: '[Kirim Insight] Pendaftaran Newsletter Baru',
      text: `Halo,\n\nAda pendaftaran insight/newsletter baru dari blog Indiekraf:\nEmail: ${email}\n\nSalam,\nSistem Website Indiekraf`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #0A2472; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">[Kirim Insight] Pendaftaran Newsletter Baru</h2>
          <p>Halo,</p>
          <p>Ada pendaftaran insight/newsletter baru dari halaman blog Indiekraf:</p>
          <table style="width: 100%; max-width: 400px; border-collapse: collapse; margin-top: 15px;">
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; width: 100px;">Email</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-family: monospace;">${email}</td>
            </tr>
          </table>
          <p style="margin-top: 25px; font-size: 12px; color: #64748b;">
            Pesan ini dikirim secara otomatis oleh Sistem Website Indiekraf.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✉️ Email successfully sent to ${destinationEmail}. Message ID: ${info.messageId}`);
    return res.json({ success: true });
  } catch (error) {
    console.error('❌ Failed to send newsletter subscription email via SMTP:', error);
    return res.status(500).json({ error: 'Failed to process subscription' });
  }
});

export default router;
