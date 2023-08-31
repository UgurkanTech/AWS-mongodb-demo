const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Instructor = require('../models/instructorModel');

// Middleware to validate instructor data before saving
const validateInstructorData = [
  check('name').notEmpty().withMessage('Name is required'),
  check('expertise').notEmpty().withMessage('Expertise is required'),
];

// Get all instructors
router.get('/', async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new instructor
router.post('/', validateInstructorData, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const instructor = new Instructor(req.body);
    await instructor.save();
    res.json(instructor);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an instructor by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedInstructor = await Instructor.findByIdAndRemove(req.params.id);
    if (!deletedInstructor) {
      return res.status(404).json({ error: 'Instructor not found' });
    }
    res.json(deletedInstructor);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
