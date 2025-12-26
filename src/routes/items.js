const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET /api/items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ updatedAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// GET /api/items/:id
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

// POST /api/items
router.post('/', async (req, res) => {
  try {
    const { name, quantity = 0, lowStockThreshold = 5, notes = '' } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    const item = new Item({ name, quantity, lowStockThreshold, notes });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// PUT /api/items/:id
router.put('/:id', async (req, res) => {
  try {
    const updates = (({ name, quantity, lowStockThreshold, notes }) => ({ name, quantity, lowStockThreshold, notes }))(req.body);
    const item = await Item.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data or ID' });
  }
});

// DELETE /api/items/:id
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

module.exports = router;