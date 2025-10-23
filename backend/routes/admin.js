// backend/routes/admin.js
import express from 'express';
import authMiddleware from '../middleware/auth.js';
import MOCK_PRODUCTS from '../data/products.js';

const router = express.Router();

// Get all products (admin-only)
router.get('/products', authMiddleware, (req, res) => {
  res.json(MOCK_PRODUCTS);
});

// Add new product
router.post('/products', authMiddleware, (req, res) => {
  const newProduct = { id: Date.now(), ...req.body };
  MOCK_PRODUCTS.push(newProduct);
  res.json({ success: true, product: newProduct });
});

// Update product
router.put('/products/:id', authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  const index = MOCK_PRODUCTS.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: 'Not found' });

  MOCK_PRODUCTS[index] = { ...MOCK_PRODUCTS[index], ...req.body };
  res.json({ success: true, updated: MOCK_PRODUCTS[index] });
});

// Delete product
router.delete('/products/:id', authMiddleware, (req, res) => {
  const id = Number(req.params.id);
  const index = MOCK_PRODUCTS.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: 'Not found' });

  MOCK_PRODUCTS.splice(index, 1);
  res.json({ success: true });
});

export default router;
