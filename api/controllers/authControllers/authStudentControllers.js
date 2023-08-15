const Student = require("../../models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { filterKeys } = require("../../utils");
const { validationResult } = require("express-validator");

// Student login controller
const auth_student_login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(402).json(errors.array());
  }
  const keepOnlyKeys = ["rollNo", "firstName", "lastName", "gender", "program"];
  if (Object.keys(req.body).length === 0 && req.get("Authorization")) {
    // If body is empty && Authorization token is provided, try loging in using it.
    try {
      const { rollNo } = jwt.verify(req.get("Authorization"), process.env.JWT_SECRET);
      try {
        // Checking if the student exists based on rollNo
        const student = await Student.findOne({ rollNo });
        if (!student) {
          return res.status(404).json({ message: "Please login." });
        } else {
          // Send only seleted key-value pairs
          const newStudent = filterKeys(keepOnlyKeys, student);
          return res.status(200).json({ student: newStudent });
        }
      } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error." });
      }
    } catch (error) {
      // JWT token not verified
      console.log(error);
      return res.status(401).json({ message: "Please login." });
    }
  } else {
    // If Authorization token is not provided try to login using username and password
    try {
      req.body["rollNo"] = req.body["rollNo"].toUpperCase();
      // Checking if the student exists
      const student = await Student.findOne({ rollNo: req.body["rollNo"] });
      if (!student) {
        return res.status(404).json({ message: "No STUDENT found with the given Roll No." });
      } else {
        // Matching the password with hashed password
        const passwordCheck = await bcrypt.compare(req.body["password"], student.password);
        if (passwordCheck) {
          // sending response with JWT token
          const jwtData = { rollNo: student.rollNo };
          const access_token = jwt.sign(jwtData, process.env.JWT_SECRET, { expiresIn: "24h" });
          // Send only seleted key-value pairs
          const newStudent = filterKeys(keepOnlyKeys, student);
          return res.status(200).json({ message: "Logged In Successfully.", student: newStudent, access_token });
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

module.exports = { auth_student_login };