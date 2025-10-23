// backend/server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import MOCK_PRODUCTS from './data/products.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Public routes
app.get('/api/products', (req, res) => {
  res.json(MOCK_PRODUCTS);
});

app.get('/api/products/category/:category', (req, res) => {
  const { category } = req.params;
  const filtered = MOCK_PRODUCTS.filter(p => {
    if (p.tags && p.tags.some(tag => tag.toLowerCase() === category.toLowerCase())) return true;
    return p.category && p.category.toLowerCase() === category.toLowerCase();
  });
  res.json(filtered);
});

app.get('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const prod = MOCK_PRODUCTS.find(p => p.id === id);
  if (!prod) return res.status(404).json({ error: 'Not found' });
  res.json(prod);
});

// Auth + Admin routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
