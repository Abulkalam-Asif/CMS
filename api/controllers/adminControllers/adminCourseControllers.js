const Course = require("../../models/Course");
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const { removeExtraSpaces, filterKeys } = require("../../utils");


// Fetches all the courses from database
const admin_courses_get_all = async (req, res) => {
  const keepOnlyKeys = ["courseId", "courseName", "creditHours"];
  try {
    let coursesList = await Course.find();
    coursesList = coursesList.map((course) => {
      const newCourse = filterKeys(keepOnlyKeys, course);
      return newCourse;
    });
    res.status(200).json({ coursesList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
}

// Fetch a single course from database
const admin_course_get_single = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(402).json(errors.array());
  }
  const keepOnlyKeys = ["courseId", "courseName", "creditHours"];
  try {
    req.params["courseId"] = req.params["courseId"].toUpperCase();

    let course = await Course.findOne({ courseId: req.params["courseId"] });
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }
    const newCourse = filterKeys(keepOnlyKeys, course);
    res.status(200).json({ course: newCourse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
}

// Adds the course to database
const admin_course_post = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(402).json(errors.array());
  }
  try {
    // Converting courseId to uppercase
    req.body["courseId"] = req.body["courseId"].toUpperCase();
    // Removing extra spaces from all fields
    for (const key in req.body) {
      req.body[key] = removeExtraSpaces(req.body[key]);
    }

    let course = await Course.findOne({ courseId: req.body["courseId"] });
    if (course) {
      return res.status(400).json({ message: "A course with given Course ID already exists." });
    }
    // Adding a new course
    course = new Course({ ...req.body });
    await course.save();
    res.status(200).json({ message: "Course added successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
}


const admin_course_delete = async (req, res) => {
  try {
    req.params["courseId"] = req.params["courseId"].toUpperCase();

    const { deletedCount } = await Course.deleteOne({ courseId: req.params["courseId"] });
    if (deletedCount === 0) {
      res.status(404).json({ message: "Course not found for deletion. Please try again." });
    } else {
      res.status(200).json({ message: "Course deleted successfully." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
}


const admin_course_put = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(402).json(errors.array());
  }
  try {
    req.params["courseId"] = req.params["courseId"].toUpperCase();
    req.body["courseId"] = req.body["courseId"].toUpperCase();

    let course = await Course.findOne({ courseId: req.params["courseId"] });
    if (!course) {
      // The courseId which is sent in parameters is not found
      return res.status(404).json({ message: "Course not found." });
    }
    course = await Course.findOne({ courseId: req.body["courseId"] });
    if (course && req.body["courseId"] !== req.params["courseId"]) {
      // A course with the new courseId already exists (If the admin doesn't want to change the courseId, it means that the courseId in the body will be equal to the courseId in the params. In that case, the operation will be legal and this if will not be executed)
      return res.status(409).json({ message: `A course with course ID ${req.body["courseId"]} already exists.` });
    }
    await Course.findOneAndUpdate({ courseId: req.params["courseId"] }, req.body);
    res.status(200).json({ message: "Course updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = { admin_courses_get_all, admin_course_get_single, admin_course_post, admin_course_delete, admin_course_put };