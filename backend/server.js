const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/instructors', require('./routes/instructorRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/lectures', require('./routes/lectureRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));



// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});