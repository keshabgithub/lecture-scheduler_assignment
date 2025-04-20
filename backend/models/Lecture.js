const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' },
  date: Date,
  duration: Number, // in minutes
  attendanceStatus: {
    type: String,
    enum: ['Attended', 'Not Attended'],
    default: 'Not Attended'
  }
});

module.exports = mongoose.model('Lecture', lectureSchema);
