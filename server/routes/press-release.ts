import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import pool from '../db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { title, subtitle, article, imageUrl } = req.body;

  if (!title || !subtitle || !article) {
    return res.status(400).json({ error: 'Title, subtitle, and article are required fields.' });
  }

  // Load dynamic destination email from site settings
  let destinationEmail = 'fikar@indiekraf.com';
  try {
    const [rows] = await pool.query('SELECT `value` FROM site_settings WHERE `key` = ?', ['email_destination_press_release']) as any;
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

  console.log(`[Press Release Submission] Received new submission: "${title}" (sending to: ${destinationEmail})`);

  // Check if image attachment exists
  let attachments: any[] = [];
  if (imageUrl) {
    const absoluteImagePath = path.join(process.cwd(), 'public', imageUrl);
    if (fs.existsSync(absoluteImagePath)) {
      attachments.push({
        filename: path.basename(absoluteImagePath),
        path: absoluteImagePath,
      });
      console.log(`[Press Release Submission] Found image attachment at: ${absoluteImagePath}`);
    } else {
      console.warn(`[Press Release Submission] Warning: Image path does not exist: ${absoluteImagePath}`);
    }
  }

  // Fallback mock mode
  if (!smtpHost || !smtpUser || !smtpPassword) {
    console.warn(
      '⚠️ SMTP configuration is incomplete. Skip sending actual press release email. ' +
      'Please check your SMTP_HOST, SMTP_USER, and SMTP_PASSWORD environment variables.'
    );
    return res.json({
      success: true,
      message: 'Press release logged successfully (mock/development mode).',
      data: { title, subtitle, article, imageUrl }
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
      subject: `[Rilis Pers] Pengajuan Rilis Pers Baru: ${title}`,
      text: `Halo,\n\nAda pengajuan Rilis Pers baru dari website Indiekraf:\n\nJudul: ${title}\nSub Judul: ${subtitle}\nArtikel:\n${article}\n\nSalam,\nSistem Website Indiekraf`,
      html: `
        <div style="font-family: sans-serif; padding: 25px; color: #333; line-height: 1.6; max-width: 650px; margin: 0 auto; border: 1px solid #f0f0f0; border-radius: 10px;">
          <h2 style="color: #0A2472; border-bottom: 2px solid #f0f0f0; padding-bottom: 12px; margin-top: 0;">📢 Pengajuan Rilis Pers Baru</h2>
          <p>Halo,</p>
          <p>Seseorang telah mengirimkan kontribusi rilis pers baru dari halaman blog website Indiekraf. Berikut adalah detail lengkapnya:</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0A2472;">
            <p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; font-weight: bold; color: #64748b;">Judul Rilis</p>
            <h3 style="margin: 0 0 15px 0; color: #0A2472; font-size: 18px; font-weight: 800;">${title}</h3>
            
            <p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; font-weight: bold; color: #64748b;">Sub Judul</p>
            <h4 style="margin: 0; color: #334155; font-size: 14px; font-weight: 600; font-style: italic;">${subtitle}</h4>
          </div>
 
          <div style="margin-bottom: 20px;">
            <p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; font-weight: bold; color: #64748b;">Artikel / Konten Rilis</p>
            <div style="white-space: pre-wrap; background-color: #ffffff; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; font-size: 13px; color: #334155; max-height: 400px; overflow-y: auto;">
              ${article}
            </div>
          </div>
 
          ${imageUrl ? `
          <div style="margin-bottom: 25px;">
            <p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; font-weight: bold; color: #64748b;">Attachment / Preview Gambar</p>
            <p style="font-size: 12px; color: #64748b; margin: 0 0 5px 0;">Gambar terlampir dalam email ini.</p>
          </div>
          ` : ''}
 
          <p style="margin-top: 35px; border-top: 1px solid #e2e8f0; padding-top: 15px; font-size: 11px; color: #94a3b8; text-align: center;">
            Pesan ini dikirim secara otomatis oleh Sistem Website Indiekraf.
          </p>
        </div>
      `,
      attachments: attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✉️ Press release email successfully sent to ${destinationEmail}. Message ID: ${info.messageId}`);
    return res.json({ success: true });
  } catch (error) {
    console.error('❌ Failed to send press release email via SMTP:', error);
    return res.status(500).json({ error: 'Failed to process press release submission' });
  }
});

export default router;
