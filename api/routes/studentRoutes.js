const studentRouter = require('express').Router();
const { student_login } = require('../controllers');
const { student_login_validation } = require('../validations');

studentRouter.post("/login", student_login_validation, student_login);

module.exports = studentRouter;