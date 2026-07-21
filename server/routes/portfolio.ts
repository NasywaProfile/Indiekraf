import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET all active portfolio items
router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM portfolio_items WHERE is_active = 1 ORDER BY sort_order ASC'
    ) as any;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch portfolio items' });
  }
});

// GET all portfolio items (admin)
router.get('/all', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM portfolio_items ORDER BY sort_order ASC') as any;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch portfolio items' });
  }
});

// GET single item
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM portfolio_items WHERE id = ?', [req.params.id]) as any;
    if (rows.length === 0) return res.status(404).json({ error: 'Item not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch item' });
  }
});

// POST create portfolio item
router.post('/', async (req, res) => {
  const { year, client, client_en, title, title_en, category, category_en, description, description_en, image_url, sort_order, is_active, btn_text_id, btn_text_en, link_url } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO portfolio_items (year, client, client_en, title, title_en, category, category_en, description, description_en, image_url, sort_order, is_active, btn_text_id, btn_text_en, link_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [year, client, client_en, title, title_en, category, category_en, description, description_en, image_url, sort_order || 0, is_active ?? 1, btn_text_id || '', btn_text_en || '', link_url || '']
    ) as any;
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create portfolio item' });
  }
});

// PUT update portfolio item
router.put('/:id', async (req, res) => {
  const { year, client, client_en, title, title_en, category, category_en, description, description_en, image_url, sort_order, is_active, btn_text_id, btn_text_en, link_url } = req.body;
  try {
    await pool.query(
      `UPDATE portfolio_items SET year=?, client=?, client_en=?, title=?, title_en=?, category=?, category_en=?, description=?, description_en=?, image_url=?, sort_order=?, is_active=?, btn_text_id=?, btn_text_en=?, link_url=? WHERE id=?`,
      [year, client, client_en, title, title_en, category, category_en, description, description_en, image_url, sort_order, is_active, btn_text_id || '', btn_text_en || '', link_url || '', req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update portfolio item' });
  }
});

// DELETE portfolio item
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM portfolio_items WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete portfolio item' });
  }
});

export default router;
