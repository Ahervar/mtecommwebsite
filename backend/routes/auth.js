// backend/routes/auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

// Hardcoded admin (for now)
const ADMIN = {
  username: 'admin',
  passwordHash: '$2b$10$ki1kI4bveKaWD8C7t/cQOuf6mmxbZeJKxNAiBRLM/8duaej3sOr12'
  // hash of "admin123"
};

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Missing credentials' });

  if (username !== ADMIN.username)
    return res.status(401).json({ message: 'Invalid username or password' });

  const valid = await bcrypt.compare(password, ADMIN.passwordHash);
  if (!valid)
    return res.status(401).json({ message: 'Invalid username or password' });

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
});

export default router;
