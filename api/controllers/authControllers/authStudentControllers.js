const Student = require("../../models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const auth_student_login = async (req, res) => {
  if (Object.keys(req.body).length === 0 && req.get("Authorization")) {
    try {
      const { rollNo } = jwt.verify(req.get("Authorization"), process.env.JWT_SECRET);
      try {
        // Checking if the student exists based on rollNo
        const student = await Student.findOne({ rollNo });
        if (!student) {
          res.status(404).json({ message: "Student not found." });
        } else {
          res.status(200).json({ message: "Automatically Logged In Successfully.", student });
        }
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error." });
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Please login again." });
    }
  } else {
    try {
      req.body["rollNo"] = req.body["rollNo"].toUpperCase();

      // Checking if the student exists
      const student = await Student.findOne({ rollNo: req.body["rollNo"] });
      if (!student) {
        res.status(404).json({ message: "Student not found." });
      } else {
        // Matching the password with hashed password
        const passwordCheck = await bcrypt.compare(req.body["password"], student.password);
        if (passwordCheck) {
          // sending response with JWT token
          const jwtData = { rollNo: student.rollNo };
          const access_token = jwt.sign(jwtData, process.env.JWT_SECRET)
          res.status(200).json({ message: "Logged In Successfully.", student, access_token });
        } else {
          res.status(401).json({ message: "Password is incorrect." });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
}

module.exports = { auth_student_login };