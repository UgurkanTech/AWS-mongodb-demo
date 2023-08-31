const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Student = require('../models/studentModel');
const authenticateUser = require('../middlewares/authMiddleware');

// Secure routes using authentication middleware
router.use(authenticateUser);

// Middleware to validate student data before saving
const validateStudentData = [
  check('name').notEmpty().withMessage('Name is required'),
  check('age').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
];

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new student
router.post('/', validateStudentData, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const student = new Student(req.body);
    await student.save();
    res.json(student);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a student by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndRemove(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(deletedStudent);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
