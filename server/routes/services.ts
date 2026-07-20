import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET all active services
router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM services WHERE is_active = 1 ORDER BY sort_order ASC'
    ) as any;
    // Parse bullets JSON
    const services = rows.map((row: any) => ({
      ...row,
      bullets: JSON.parse(row.bullets || '[]'),
    }));
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// GET all services (admin)
router.get('/all', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM services ORDER BY sort_order ASC') as any;
    const services = rows.map((row: any) => ({
      ...row,
      bullets: JSON.parse(row.bullets || '[]'),
    }));
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// GET single service
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [req.params.id]) as any;
    if (rows.length === 0) return res.status(404).json({ error: 'Service not found' });
    const s = rows[0];
    res.json({ ...s, bullets: JSON.parse(s.bullets || '[]') });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

// POST create service
router.post('/', async (req, res) => {
  const { slug, title, description, bullets, link_text, link_url, color_theme, icon_name, sort_order } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO services (slug, title, description, bullets, link_text, link_url, color_theme, icon_name, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [slug, title, description, JSON.stringify(bullets || []), link_text, link_url, color_theme, icon_name, sort_order || 0]
    ) as any;
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create service' });
  }
});

// PUT update service
router.put('/:id', async (req, res) => {
  const { slug, title, description, bullets, link_text, link_url, color_theme, icon_name, sort_order, is_active } = req.body;
  try {
    await pool.query(
      `UPDATE services SET slug=?, title=?, description=?, bullets=?, link_text=?, link_url=?, color_theme=?, icon_name=?, sort_order=?, is_active=? WHERE id=?`,
      [slug, title, description, JSON.stringify(bullets || []), link_text, link_url, color_theme, icon_name, sort_order, is_active, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update service' });
  }
});

// DELETE service
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM services WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

export default router;
