// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const app = express();
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error.message);
});
// Use the cookie-parser middleware
app.use(cookieParser());


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const authController = require('./controllers/authController');
const studentController = require('./controllers/studentController');
const instructorController = require('./controllers/instructorController');
const courseController = require('./controllers/courseController');
const rootController = require('./controllers/rootController');


app.use('/auth', authController);
app.use('/students', studentController);
app.use('/instructors', instructorController);
app.use('/courses', courseController);
app.use('/', rootController)

app.use(express.static('public'));

app.use(notFound); // Handle 404 errors
app.use(errorHandler); // Custom error handling

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.log(`Failed listening port ${PORT}`);
});
