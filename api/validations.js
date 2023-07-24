const adminStudentValidations = require("./validations/adminValidations/adminStudentValidations");
const studentValidations = require("./validations/studentValidations");

module.exports = { ...adminStudentValidations, ...studentValidations }