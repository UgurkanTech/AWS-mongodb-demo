const studentForm = document.getElementById('student-form');
const studentList = document.getElementById('student-list');

const instructorForm = document.getElementById('instructor-form');
const instructorList = document.getElementById('instructor-list');

const courseForm = document.getElementById('course-form');
const courseList = document.getElementById('course-list');
const courseInstructorSelect = document.getElementById('course-instructor');

// Fetch and display students
async function displayStudents() {
  studentList.innerHTML = '';
  const response = await axios.get('/students');
  const students = response.data;
  students.forEach(student => {
    const listItem = document.createElement('li');
    listItem.textContent = `${student.name}, Age: ${student.age}`;
    studentList.appendChild(listItem);
  });
}

// Fetch and display instructors
async function displayInstructors() {
  instructorList.innerHTML = '';
  const response = await axios.get('/instructors');
  const instructors = response.data;
  instructors.forEach(instructor => {
    const listItem = document.createElement('li');
    listItem.textContent = `${instructor.name}, Expertise: ${instructor.expertise}`;
    instructorList.appendChild(listItem);
  });
}

// Fetch and display instructors for the course form dropdown
async function displayInstructorsForCourseForm() {
  courseInstructorSelect.innerHTML = '';
  const response = await axios.get('/instructors');
  const instructors = response.data;
  instructors.forEach(instructor => {
    const option = document.createElement('option');
    option.value = instructor._id;
    option.textContent = instructor.name;
    courseInstructorSelect.appendChild(option);
  });
}

// Fetch and display courses
async function displayCourses() {
  courseList.innerHTML = '';
  const response = await axios.get('/courses');
  const courses = response.data;
  courses.forEach(course => {
    const listItem = document.createElement('li');
    listItem.textContent = `Course: ${course.title}, Instructor: ${course.instructor}`;
    courseList.appendChild(listItem);
  });
}

// Submit student form
studentForm.addEventListener('submit', async event => {
  event.preventDefault();
  const name = document.getElementById('student-name').value;
  const age = document.getElementById('student-age').value;
  const response = await axios.post('/students', { name, age });
  if (response.status === 200) {
    displayStudents();
    studentForm.reset();
  }
});

// Submit instructor form
instructorForm.addEventListener('submit', async event => {
  event.preventDefault();
  const name = document.getElementById('instructor-name').value;
  const expertise = document.getElementById('instructor-expertise').value;
  const response = await axios.post('/instructors', { name, expertise });
  if (response.status === 200) {
    displayInstructors();
    displayInstructorsForCourseForm();
    instructorForm.reset();
  }
});

// Submit course form
courseForm.addEventListener('submit', async event => {
  event.preventDefault();
  const title = document.getElementById('course-title').value;
  const instructor = document.getElementById('course-instructor').value;
  const response = await axios.post('/courses', { title, instructor });
  if (response.status === 200) {
    displayCourses();
    courseForm.reset();
  }
});

// Initial displays
displayStudents();
displayInstructors();
displayInstructorsForCourseForm();
displayCourses();
