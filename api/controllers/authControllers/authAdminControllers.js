const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

module.exports = { auth_admin_signup };