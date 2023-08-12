const Student = require("../../models/Student");
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const { removeExtraSpaces, filterKeys } = require("../../utils");

// Fetches all the students from database
const admin_students_get_all = async (req, res) => {
  const keepOnlyKeys = ["rollNo", "firstName", "lastName", "gender", "program"];
  try {
    let studentsList = await Student.find();
    studentsList = studentsList.map((student) => {
      const newStudent = filterKeys(keepOnlyKeys, student);
      return newStudent;
    });
    return res.status(200).json({ studentsList });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

// Fetch a single student from database
const admin_student_get_single = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(402).json(errors.array());
  }
  const keepOnlyKeys = ["rollNo", "firstName", "lastName", "gender", "program"];
  try {
    req.params["rollNo"] = req.params["rollNo"].toUpperCase();

    let student = await Student.findOne({ rollNo: req.params["rollNo"] });
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }
    const newStudent = filterKeys(keepOnlyKeys, student);
    return res.status(200).json({ student: newStudent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}


// Adds the student to database
const admin_student_post = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(402).json(errors.array());
  }
  try {
    // Converting rollNo to uppercase
    req.body["rollNo"] = req.body["rollNo"].toUpperCase();
    // Removing extra spaces from all fields
    for (const key in req.body) {
      req.body[key] = removeExtraSpaces(req.body[key]);
    }

    let student = await Student.findOne({ rollNo: req.body["rollNo"] });
    if (student) {
      return res.status(400).json({ message: "A student with given Roll No. already exists." });
    }
    // Hashing the password
    const hashedPassword = await bcrypt.hash(req.body["password"], 10);
    student = new Student({ ...req.body, password: hashedPassword });
    await student.save();
    return res.status(200).json({ message: "Student added successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

// Deletes a student from database based on rollNo
const admin_student_delete = async (req, res) => {
  try {
    req.params["rollNo"] = req.params["rollNo"].toUpperCase();

    const { deletedCount } = await Student.deleteOne({ rollNo: req.params["rollNo"] });
    if (deletedCount === 0) {
      return res.status(404).json({ message: "Student not found for deletion. Please try again." });
    } else {
      return res.status(200).json({ message: "Student deleted successfully." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}


const admin_student_put = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(402).json(errors.array());
  }
  try {
    req.params["rollNo"] = req.params["rollNo"].toUpperCase();
    req.body["rollNo"] = req.body["rollNo"].toUpperCase();

    let student = await Student.findOne({ rollNo: req.params["rollNo"] });
    if (!student) {
      // The rollNo which is sent in parameters is not found
      return res.status(404).json({ message: "Student not found." });
    }
    student = await Student.findOne({ rollNo: req.body["rollNo"] });
    if (student && req.body["rollNo"] !== req.params["rollNo"]) {
      // A user with the new rollNo already exists (If the admin doesn't want to change the rollNo, it means that the rollNo in the body will be equal to the rollNo in the params. In that case, the operation will be legal and this if will not be executed)
      return res.status(409).json({ message: `A student with roll no. ${req.body["rollNo"]} already exists.` });
    }
    const hashedPassword = await bcrypt.hash(req.body["password"], 10);
    req.body.password = hashedPassword;
    await Student.findOneAndUpdate({ rollNo: req.params["rollNo"] }, req.body);
    return res.status(200).json({ message: "Student updated successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = { admin_student_post, admin_student_delete, admin_students_get_all, admin_student_get_single, admin_student_put };