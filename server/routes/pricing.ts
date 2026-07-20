import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET all active pricing plans
router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM pricing_plans WHERE is_active = 1 ORDER BY sort_order ASC'
    ) as any;
    const plans = rows.map((row: any) => ({
      ...row,
      bullets: JSON.parse(row.bullets || '[]'),
      bullets_en: JSON.parse(row.bullets_en || '[]'),
    }));
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pricing plans' });
  }
});

// GET all pricing plans (admin)
router.get('/all', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pricing_plans ORDER BY sort_order ASC') as any;
    const plans = rows.map((row: any) => ({
      ...row,
      bullets: JSON.parse(row.bullets || '[]'),
      bullets_en: JSON.parse(row.bullets_en || '[]'),
    }));
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pricing plans' });
  }
});

// GET single pricing plan
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pricing_plans WHERE id = ?', [req.params.id]) as any;
    if (rows.length === 0) return res.status(404).json({ error: 'Plan not found' });
    const p = rows[0];
    res.json({ ...p, bullets: JSON.parse(p.bullets || '[]'), bullets_en: JSON.parse(p.bullets_en || '[]') });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch plan' });
  }
});

// POST create pricing plan
router.post('/', async (req, res) => {
  const { slug, name, name_en, subtitle, subtitle_en, price, price_en, badge, badge_en, color_theme, bullets, bullets_en, category, sort_order, btn_text_id, btn_text_en, btn_link } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO pricing_plans (slug, name, name_en, subtitle, subtitle_en, price, price_en, badge, badge_en, color_theme, bullets, bullets_en, category, sort_order, btn_text_id, btn_text_en, btn_link)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [slug, name, name_en, subtitle, subtitle_en, price, price_en, badge, badge_en, color_theme, JSON.stringify(bullets || []), JSON.stringify(bullets_en || []), category, sort_order || 0, btn_text_id || '', btn_text_en || '', btn_link || '']
    ) as any;
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create plan' });
  }
});

// PUT update pricing plan
router.put('/:id', async (req, res) => {
  const { slug, name, name_en, subtitle, subtitle_en, price, price_en, badge, badge_en, color_theme, bullets, bullets_en, category, sort_order, is_active, btn_text_id, btn_text_en, btn_link } = req.body;
  try {
    await pool.query(
      `UPDATE pricing_plans SET slug=?, name=?, name_en=?, subtitle=?, subtitle_en=?, price=?, price_en=?, badge=?, badge_en=?, color_theme=?, bullets=?, bullets_en=?, category=?, sort_order=?, is_active=?, btn_text_id=?, btn_text_en=?, btn_link=? WHERE id=?`,
      [slug, name, name_en, subtitle, subtitle_en, price, price_en, badge, badge_en, color_theme, JSON.stringify(bullets || []), JSON.stringify(bullets_en || []), category, sort_order, is_active, btn_text_id || '', btn_text_en || '', btn_link || '', req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update plan' });
  }
});

// DELETE pricing plan
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM pricing_plans WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete plan' });
  }
});

export default router;
