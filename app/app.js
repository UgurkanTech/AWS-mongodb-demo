const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Import body-parser
require('dotenv').config()
const PORT = process.env.PORT;


// Define Mongoose schemas for Student, Instructor, and Course
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const instructorSchema = new mongoose.Schema({
  name: String,
  expertise: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  instructor: mongoose.Schema.Types.ObjectId,
});

const Student = mongoose.model('Student', studentSchema);
const Instructor = mongoose.model('Instructor', instructorSchema);
const Course = mongoose.model('Course', courseSchema);

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error.message);
});

app.use(express.json()); // Enable JSON request body parsing
app.use(bodyParser.urlencoded({ extended: false }));

// Students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/students/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndRemove(req.params.id);
    res.json(deletedStudent);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Instructors
app.get('/instructors', async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/instructors', async (req, res) => {
  try {
    const instructor = new Instructor(req.body);
    await instructor.save();
    res.json(instructor);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/instructors/:id', async (req, res) => {
  try {
    const deletedInstructor = await Instructor.findByIdAndRemove(req.params.id);
    res.json(deletedInstructor);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Courses
app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/courses', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.json(course);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/courses/:id', async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndRemove(req.params.id);
    res.json(deletedCourse);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use(express.static('public'));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.log(`Failed listening port ${PORT}`);
});
