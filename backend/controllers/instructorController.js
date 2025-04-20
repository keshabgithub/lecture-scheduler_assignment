const Instructor = require('../models/Instructor');

// Create new instructor
exports.createInstructor = async (req, res) => {
  try {
    const newInstructor = new Instructor(req.body);
    const saved = await newInstructor.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all instructors
exports.getInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
