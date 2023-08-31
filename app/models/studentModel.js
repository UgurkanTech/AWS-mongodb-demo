// studentModel.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

module.exports = mongoose.model('Student', studentSchema);
