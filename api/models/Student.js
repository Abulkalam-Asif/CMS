const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
  "rollNo": {
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
  "program": {
    type: String,
    required: true
  },
  "addedOn": {
    type: Date,
    default: new Date
  }
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;