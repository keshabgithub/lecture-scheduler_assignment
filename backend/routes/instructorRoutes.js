const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {
  createInstructor,
  getInstructors
} = require('../controllers/instructorController');

const Instructor = require('../models/Instructor');

// ✅ Register route for new instructors
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await Instructor.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Instructor with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newInstructor = new Instructor({ name, email, password: hashedPassword });
    const saved = await newInstructor.save();

    res.status(201).json({ message: 'Instructor registered successfully', id: saved._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// existing routes
router.post('/', createInstructor);
router.get('/', getInstructors);

module.exports = router;
