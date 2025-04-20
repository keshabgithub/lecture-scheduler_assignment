const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Instructor = require('../models/Instructor'); // ✅ Your Mongoose model

// ✅ Instructor Login using MongoDB + bcrypt
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Instructor.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: 'instructor' }, 'secret123', {
      expiresIn: '1h'
    });

    res.json({ token, id: user._id, role: 'instructor', email: user.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Admin Login (hardcoded)
router.post('/admin-login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@example.com' && password === 'admin123') {
    const token = jwt.sign({ role: 'admin' }, 'secret123', { expiresIn: '1h' });
    return res.json({ token });
  }

  return res.status(401).json({ error: 'Invalid admin credentials' });
});

module.exports = router;
