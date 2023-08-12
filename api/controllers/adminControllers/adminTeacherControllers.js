const Teacher = require("../../models/Teacher");
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const { removeExtraSpaces, filterKeys } = require("../../utils");


// Fetches all the teachers from database
const admin_teachers_get_all = async (req, res) => {
  const keepOnlyKeys = ["teacherId", "firstName", "lastName", "gender", "qualification", "department"];
  try {
    let teachersList = await Teacher.find();
    teachersList = teachersList.map((teacher) => {
      const newTeacher = filterKeys(keepOnlyKeys, teacher);
      return newTeacher;
    });
    return res.status(200).json({ teachersList });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

// Fetch a single teacher from database
const admin_teacher_get_single = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(402).json(errors.array());
  }
  const keepOnlyKeys = ["teacherId", "firstName", "lastName", "gender", "qualification", "department"];
  try {
    req.params["teacherId"] = req.params["teacherId"].toUpperCase();

    let teacher = await Teacher.findOne({ teacherId: req.params["teacherId"] });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found." });
    }
    const newTeacher = filterKeys(keepOnlyKeys, teacher);
    return res.status(200).json({ teacher: newTeacher });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

// Adds the teacher to database
const admin_teacher_post = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(402).json(errors.array());
  }
  try {
    // Converting teacherId to uppercase
    req.body["teacherId"] = req.body["teacherId"].toUpperCase();
    // Removing extra spaces from all fields
    for (const key in req.body) {
      req.body[key] = removeExtraSpaces(req.body[key]);
    }

    let teacher = await Teacher.findOne({ teacherId: req.body["teacherId"] });
    if (teacher) {
      return res.status(400).json({ message: "A teacher with given Teacher ID already exists." });
    }
    // Hashing the password
    const hashedPassword = await bcrypt.hash(req.body["password"], 10);
    teacher = new Teacher({ ...req.body, password: hashedPassword });
    await teacher.save();
    return res.status(200).json({ message: "Teacher added successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}


const admin_teacher_delete = async (req, res) => {
  try {
    req.params["teacherId"] = req.params["teacherId"].toUpperCase();

    const { deletedCount } = await Teacher.deleteOne({ teacherId: req.params["teacherId"] });
    if (deletedCount === 0) {
      return res.status(404).json({ message: "Teacher not found for deletion. Please try again." });
    } else {
      return res.status(200).json({ message: "Teacher deleted successfully." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}


const admin_teacher_put = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(402).json(errors.array());
  }
  try {
    req.params["teacherId"] = req.params["teacherId"].toUpperCase();
    req.body["teacherId"] = req.body["teacherId"].toUpperCase();

    let teacher = await Teacher.findOne({ teacherId: req.params["teacherId"] });
    if (!teacher) {
      // The teacherId which is sent in parameters is not found
      return res.status(404).json({ message: "Teacher not found." });
    }
    teacher = await Teacher.findOne({ teacherId: req.body["teacherId"] });
    if (teacher && req.body["teacherId"] !== req.params["teacherId"]) {
      // A user with the new teacherId already exists (If the admin doesn't want to change the teacherId, it means that the teacherId in the body will be equal to the teacherId in the params. In that case, the operation will be legal and this if will not be executed)
      return res.status(409).json({ message: `A teacher with teacher ID ${req.body["teacherId"]} already exists.` });
    }
    const hashedPassword = await bcrypt.hash(req.body["password"], 10);
    req.body.password = hashedPassword;
    await Teacher.findOneAndUpdate({ teacherId: req.params["teacherId"] }, req.body);
    return res.status(200).json({ message: "Teacher updated successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}



module.exports = { admin_teachers_get_all, admin_teacher_get_single, admin_teacher_post, admin_teacher_delete, admin_teacher_put }