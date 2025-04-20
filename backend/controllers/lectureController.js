// backend/controllers/lectureController.js

const Lecture = require('../models/Lecture');

// ✅ Create/Schedule a new lecture
exports.scheduleLecture = async (req, res) => {
  const { courseId, instructorId, date, duration } = req.body;
  console.log('📥 Received in backend:', req.body);

  // Validate fields
  if (!courseId || !instructorId || !date || !duration) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const start = new Date(date);
  const end = new Date(start.getTime() + duration * 60000);

  // 🛡 Add 5-minute buffer before and after
  const bufferMs = 5 * 60 * 1000;
  const startWithBuffer = new Date(start.getTime() - bufferMs);
  const endWithBuffer = new Date(end.getTime() + bufferMs);

  try {
    // ✅ Simplified conflict check using buffer
    const conflict = await Lecture.findOne({
      instructorId,
      date: { $lt: endWithBuffer, $gt: startWithBuffer }
    });

    if (conflict) {
      console.log('⛔ Conflict found:', conflict);
      return res.status(400).json({ error: "Instructor already has a lecture at this time" });
    }

    // ✅ Save new lecture
    const newLecture = new Lecture({
      courseId,
      instructorId,
      date: start,
      duration
    });

    const saved = await newLecture.save();
    res.status(201).json(saved);

  } catch (err) {
    console.error("❌ Backend error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all lectures with populated instructor & course
exports.getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find()
      .populate('instructorId')
      .populate('courseId');
    res.json(lectures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update attendance status (Attended / Not Attended)
exports.updateAttendance = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await Lecture.findByIdAndUpdate(
      id,
      { attendanceStatus: status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};