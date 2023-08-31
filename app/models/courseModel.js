// courseModel.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  instructor: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Course', courseSchema);
