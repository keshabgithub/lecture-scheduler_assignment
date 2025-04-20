// backend/routes/statsRoutes.js

const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor');
const Course = require('../models/Course');
const Lecture = require('../models/Lecture');

// ✅ GET /api/stats - Admin Dashboard Stats
router.get('/', async (req, res) => {
    try {
      const instructorCount = await Instructor.countDocuments();
      const courseCount = await Course.countDocuments();
      const lectureCount = await Lecture.countDocuments();
  
      console.log('📊 Instructor Count:', instructorCount);
      console.log('📚 Course Count:', courseCount);
      console.log('📅 Lecture Count:', lectureCount);
  
      res.json({
        instructors: instructorCount,
        courses: courseCount,
        lectures: lectureCount
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

module.exports = router;
