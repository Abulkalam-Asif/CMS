const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { filterKeys } = require("../../utils");
const { validationResult } = require("express-validator");

// This is basic admin signup and is not provided on the UI
const auth_admin_signup = async (req, res) => {
  // Hashing the password
  try {
    const hashedPassword = await bcrypt.hash(req.body["password"], 10);
    const admin = new Admin({ ...req.body, password: hashedPassword });
    await admin.save();
    return res.status(200).json({ message: "Admin added successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

// Admin login controller

const auth_admin_login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(402).json(errors.array());
  }
  // Getting session info to get session cookie
  const session = req.session;
  console.log("body", req.body);
  console.log("session", session);
  const keepOnlyKeys = ["name", "username"];
  try {
    if (session.userId) {
      // If the session cookie contains a userId, authenticate the user
      const userId = session.userId;
      // Checking if the admin with the given userId = _id exists
      const admin = await Admin.findById(userId);
      if (!admin) {
        return res.status(404).json({ message: "Please login." });
      } else {
        // Send only seleted key-value pairs
        const newAdmin = filterKeys(keepOnlyKeys, admin);
        return res.status(200).json({ admin: newAdmin });
      }
    } else {
      // If the session cookie doesn't contain a username, initiate authentication based on the provided username and password in the request body
      // Checking if the admin with the given username exists
      const admin = await Admin.findOne({ username: req.body["username"] });
      if (!admin) {
        return res.status(404).json({ message: "No ADMIN found with the given Username." });
      } else {
        // Matching the password with hashed password
        const passwordCheck = await bcrypt.compare(req.body["password"], admin.password);
        if (passwordCheck) {
          // setting MongoDB's _id in session
          session.userId = admin._id;
          // Send only seleted key-value pairs
          const newAdmin = filterKeys(keepOnlyKeys, admin);
          res.setHeader('Set-Cookie', `userId=${session.userId}; path=/login`);
          return res.status(200).json({ message: "Logged In Successfully.", admin: newAdmin });
        } else {
          return res.status(401).json({ message: "Password is incorrect." });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = { auth_admin_signup, auth_admin_login };