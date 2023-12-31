const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { filterKeys } = require("../../utils");
const { validationResult } = require("express-validator");

// Admin login controller
const auth_admin_login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(402).json(errors.array());
  }
  const keepOnlyKeys = ["name", "username"];
  if (Object.keys(req.body).length === 0 && req.get("Authorization")) {
    // If body is empty && Authorization token is provided, try loging in using it.
    try {
      const { username } = jwt.verify(req.get("Authorization"), process.env.JWT_SECRET);
      try {
        // Checking if the admin exists based on username
        const admin = await Admin.findOne({ username });
        if (!admin) {
          return res.status(404).json({ message: "Please login." });
        } else {
          // Send only seleted key-value pairs
          const newAdmin = filterKeys(keepOnlyKeys, admin);
          return res.status(200).json({ admin: newAdmin });
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
      // Checking if the admin exists
      const admin = await Admin.findOne({ username: req.body["username"] });
      if (!admin) {
        return res.status(404).json({ message: "No ADMIN found with the given Username." });
      } else {
        // Matching the password with hashed password
        const passwordCheck = await bcrypt.compare(req.body["password"], admin.password);
        if (passwordCheck) {
          // sending response with JWT token
          const jwtData = { username: admin.username };
          const access_token = jwt.sign(jwtData, process.env.JWT_SECRET, { expiresIn: "24h" })
          // Send only seleted key-value pairs
          const newAdmin = filterKeys(keepOnlyKeys, admin);
          return res.status(200).json({ message: "Logged In Successfully.", admin: newAdmin, access_token });
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

module.exports = { auth_admin_login };