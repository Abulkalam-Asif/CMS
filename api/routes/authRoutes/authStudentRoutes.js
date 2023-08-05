const authStudentRouter = require('express').Router();
const { auth_student_login } = require('../../controllers');
const { auth_student_login_validation } = require('../../validations');

authStudentRouter.post("/login", auth_student_login_validation, auth_student_login);

module.exports = authStudentRouter;