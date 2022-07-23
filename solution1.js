const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises');

const courseSchema = new mongoose.Schema({
  _id: String,
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  return await Course.find({ isPublished: true, tags: 'backend' })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

// run();

async function getPublishedCourses() {
  const courses = await Course.find({
    isPublished: true,
    tags: { $in: ['backend', 'frontend'] }
  })
    .sort('-price')
    .select('name author price');

  console.log(courses);
}
// getPublishedCourses();

async function solutionThree(params) {
  const courses = await Course.find({
    isPublished: true
  })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .sort('-price')
    .select('name author price');

  console.log(courses, 'courses');
}
// solutionThree();

async function updateCourse(id) {
  console.log(id);
  try {
    const course = await Course.findById(id);
    if (!course) return;
    course.isPublished = true;
    course.author = 'Another Author';
    const result = await course.save();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

// updateCourse('5a68fde3f09ad7646ddec17e');

async function updateCourseSecond(id) {
  const result = await Course.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        author: 'kishan kumar srivalli',
        isPublished: false
      }
    },
    { new: true }
  );
  console.log(result);
}
// updateCourseSecond('5a68fde3f09ad7646ddec17e');

async function deleteOne(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}
deleteOne('5a68fde3f09ad7646ddec17e');

async function deleteMany(id) {
  // const result = await Course.deleteMany({ _id: id });
  const result = await Course.findByIdAndDelete({ _id: id });
  console.log(result);
}
