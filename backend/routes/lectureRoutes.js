const express = require('express');
const router = express.Router();

const {
  scheduleLecture,
  getLectures,
  updateAttendance
} = require('../controllers/lectureController');

// Create a lecture
router.post('/', scheduleLecture);

// Get all lectures
router.get('/', getLectures);

// Update attendance
router.put('/attendance/:id', updateAttendance);

module.exports = router;
