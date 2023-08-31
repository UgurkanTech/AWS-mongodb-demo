// instructorModel.js
const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  name: String,
  expertise: String,
});

module.exports = mongoose.model('Instructor', instructorSchema);
