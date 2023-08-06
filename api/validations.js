const authAdminValidations = require("./validations/authValidations/authAdminValidations");
const authStudentValidations = require("./validations/authValidations/authStudentValidations");
const adminStudentValidations = require("./validations/adminValidations/adminStudentValidations");

module.exports = { ...authAdminValidations, ...adminStudentValidations, ...authStudentValidations }