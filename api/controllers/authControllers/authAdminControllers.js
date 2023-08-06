const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { filterKeys } = require("../../utils");

// This is basic admin signup and is not provided on the UI
const auth_admin_signup = async (req, res) => {
  // Hashing the password
  try {
    const hashedPassword = await bcrypt.hash(req.body["password"], 10);
    const admin = new Admin({ ...req.body, password: hashedPassword });
    await admin.save();
    res.status(200).json({ message: "Admin added successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
}

// Admin login controller
const auth_admin_login = async (req, res) => {
  const keepOnlyKeys = ["name", "username"];
  if (Object.keys(req.body).length === 0 && req.get("Authorization")) {
    // If body is empty && Authorization token is provided, try loging in using it.
    try {
      const { username } = jwt.verify(req.get("Authorization"), process.env.JWT_SECRET);
      try {
        // Checking if the admin exists based on username
        const admin = await Admin.findOne({ username });
        if (!admin) {
          res.status(404).json({ message: "Admin not found with given Username." });
        } else {
          // Send only seleted key-value pairs
          const newAdmin = filterKeys(keepOnlyKeys, admin);
          res.status(200).json({ message: "Automatically Logged In Successfully.", admin: newAdmin });
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
    // If Authorization token is not provided try to login using username and password
    try {
      // Checking if the admin exists
      const admin = await Admin.findOne({ username: req.body["username"] });
      if (!admin) {
        res.status(404).json({ message: "Admin not found." });
      } else {
        // Matching the password with hashed password
        const passwordCheck = await bcrypt.compare(req.body["password"], admin.password);
        if (passwordCheck) {
          // sending response with JWT token
          const jwtData = { username: admin.username };
          const access_token = jwt.sign(jwtData, process.env.JWT_SECRET, { expiresIn: "10m" })
          // Send only seleted key-value pairs
          const newAdmin = filterKeys(keepOnlyKeys, admin);
          res.status(200).json({ message: "Logged In Successfully.", admin: newAdmin, access_token });
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

module.exports = { auth_admin_signup, auth_admin_login };