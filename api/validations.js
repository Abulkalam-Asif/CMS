const authStudentValidations = require("./validations/authValidations/authStudentValidations");
const adminStudentValidations = require("./validations/adminValidations/adminStudentValidations");

module.exports = { ...adminStudentValidations, ...authStudentValidations}