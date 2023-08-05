const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const auth_admin_signup = async (req, res) => {
  res.send(req.body);
}

module.exports = { auth_admin_signup };