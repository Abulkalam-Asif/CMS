const authAdminValidations = require("./validations/authValidations/authAdminValidations");
const authStudentValidations = require("./validations/authValidations/authStudentValidations");
const authTeacherValidations = require("./validations/authValidations/authTeacherValidations");
const adminStudentValidations = require("./validations/adminValidations/adminStudentValidations");
const adminTeacherValidations = require("./validations/adminValidations/adminTeacherValidations");
const adminCourseValidations = require("./validations/adminValidations/adminCourseValidations");

module.exports = { ...authAdminValidations, ...authStudentValidations, ...authTeacherValidations, ...adminStudentValidations, ...adminTeacherValidations, ...adminCourseValidations }