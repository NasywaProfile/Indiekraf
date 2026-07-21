import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET all blog posts
router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM blog_posts WHERE is_published = 1 ORDER BY created_at DESC'
    ) as any;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// GET all blog posts (admin - termasuk yang tidak dipublish)
router.get('/all', async (_req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM blog_posts ORDER BY created_at DESC'
    ) as any;
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// GET single blog post by id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM blog_posts WHERE id = ?', [req.params.id]) as any;
    if (rows.length === 0) return res.status(404).json({ error: 'Post not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// POST create new blog post
router.post('/', async (req, res) => {
  const { category, category_en, title, title_en, description, description_en, content, content_en, author, author_en, image_url, read_more_id, read_more_en, read_more_link, is_published } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO blog_posts (category, category_en, title, title_en, description, description_en, content, content_en, author, author_en, image_url, read_more_id, read_more_en, read_more_link, is_published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [category, category_en, title, title_en, description, description_en, content, content_en, author || 'Tim Indiekraf', author_en || 'Indiekraf Team', image_url, read_more_id, read_more_en, read_more_link, is_published ?? 1]
    ) as any;
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// PUT update blog post
router.put('/:id', async (req, res) => {
  const { category, category_en, title, title_en, description, description_en, content, content_en, author, author_en, image_url, read_more_id, read_more_en, read_more_link, is_published } = req.body;
  try {
    await pool.query(
      `UPDATE blog_posts SET category=?, category_en=?, title=?, title_en=?, description=?, description_en=?, content=?, content_en=?, author=?, author_en=?, image_url=?, read_more_id=?, read_more_en=?, read_more_link=?, is_published=? WHERE id=?`,
      [category, category_en, title, title_en, description, description_en, content, content_en, author, author_en, image_url, read_more_id, read_more_en, read_more_link, is_published, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// DELETE blog post
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM blog_posts WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

export default router;
