const authTeacherRouter = require('express').Router();
const { auth_teacher_login } = require('../../controllers');
const { auth_teacher_login_validation } = require('../../validations');

authTeacherRouter.post("/login", auth_teacher_login_validation, auth_teacher_login);

module.exports = authTeacherRouter;