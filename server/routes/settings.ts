import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET all settings as key-value map
router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT `key`, `value` FROM site_settings') as any;
    const settings: Record<string, string> = {};
    rows.forEach((row: any) => { settings[row.key] = row.value; });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// PUT update a setting by key
router.put('/:key', async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  try {
    await pool.query(
      'INSERT INTO site_settings (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = ?',
      [key, value, value]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update setting' });
  }
});

// PUT bulk update multiple settings
router.put('/', async (req, res) => {
  const settings: Record<string, string> = req.body;
  try {
    const entries = Object.entries(settings);
    for (const [key, value] of entries) {
      await pool.query(
        'INSERT INTO site_settings (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = ?',
        [key, value, value]
      );
    }
    res.json({ success: true, updated: entries.length });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

export default router;
