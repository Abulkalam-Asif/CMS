const Teacher = require("../../models/Teacher");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { filterKeys } = require("../../utils");
const { validationResult } = require("express-validator");

// Teacher login controller
const auth_teacher_login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(402).json(errors.array());
  }
  const keepOnlyKeys = ["teacherId", "firstName", "lastName", "gender", "qualification", "department"];
  if (Object.keys(req.body).length === 0 && req.get("Authorization")) {
    // If body is empty && Authorization token is provided, try loging in using it.
    try {
      const { teacherId } = jwt.verify(req.get("Authorization"), process.env.JWT_SECRET);
      try {
        // Checking if the teacher exists based on teacherId
        const teacher = await Teacher.findOne({ teacherId });
        if (!teacher) {
          return res.status(404).json({ message: "Please login again." });
        } else {
          // Send only seleted key-value pairs
          const newTeacher = filterKeys(keepOnlyKeys, teacher);
          return res.status(200).json({ teacher: newTeacher });
        }
      } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error." });
      }
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Please login again." });
    }
  } else {
    // If Authorization token is not provided try to login using username and password
    try {
      req.body["teacherId"] = req.body["teacherId"].toUpperCase();
      // Checking if the teacher exists
      const teacher = await Teacher.findOne({ teacherId: req.body["teacherId"] });
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found." });
      } else {
        // Matching the password with hashed password
        const passwordCheck = await bcrypt.compare(req.body["password"], teacher.password);
        if (passwordCheck) {
          // sending response with JWT token
          const jwtData = { teacherId: teacher.teacherId };
          const access_token = jwt.sign(jwtData, process.env.JWT_SECRET, { expiresIn: "10m" });
          // Send only seleted key-value pairs
          const newTeacher = filterKeys(keepOnlyKeys, teacher);
          return res.status(200).json({ message: "Logged In Successfully.", teacher: newTeacher, access_token });
        } else {
          return res.status(401).json({ message: "Password is incorrect." });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }
}

module.exports = { auth_teacher_login };