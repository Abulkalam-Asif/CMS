const authAdminRouter = require('express').Router();

const { auth_admin_login } = require('../../controllers');
const Admin = require('../../models/Admin');
const { auth_admin_login_validation } = require('../../validations');
const bcrypt = require("bcrypt");

authAdminRouter.post("/login", auth_admin_login_validation, auth_admin_login);


// This is just basic admin signup route and is not provided on the UI
// (Uncomment it to POST an admin object to the database in the following format)
// {
//   "name": "",
//   "username": "",
//   "password": ""
// }

// authAdminRouter.post('/signup', async (req, res) => {
//   try {
//     // Hashing the password
//     const hashedPassword = await bcrypt.hash(req.body["password"], 10);
//     const admin = new Admin({ ...req.body, password: hashedPassword });
//     await admin.save();
//     return res.status(200).json({ message: "Admin added successfully." });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal server error." });
//   }
// });

// This is just basic admin signup route and is not provided on the UI


module.exports = authAdminRouter;