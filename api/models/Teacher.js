const mongoose = require('mongoose');
const { Schema } = mongoose;

const teacherSchema = new Schema({
  "teacherId": {
    type: String,
    required: true,
    unique: true
  },
  "firstName": {
    type: String,
    required: true
  },
  "lastName": {
    type: String,
    required: true
  },
  "password": {
    type: String,
    required: true,
  },
  "gender": {
    type: String,
    required: true
  },
  "qualification": {
    type: String,
    required: true
  },
  "department": {
    type: String,
    required: true
  },
  "coursesAssigned": {
    type: Array,
  },
  "addedOn": {
    type: Date,
    default: new Date
  }
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;