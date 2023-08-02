const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
  "courseId": {
    type: String,
    required: true,
    unique: true
  },
  "courseName": {
    type: String,
    required: true
  },
  "creditHours": {
    type: Number,
    required: true
  },
  "addedOn": {
    type: Date,
    default: new Date
  }
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;