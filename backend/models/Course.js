const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: String,
  level: String,
  description: String,
  image: String
});

module.exports = mongoose.model('Course', courseSchema);
