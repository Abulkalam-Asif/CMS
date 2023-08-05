const authAdminControllers = require("./controllers/authControllers/authAdminControllers");
const authStudentControllers = require("./controllers/authControllers/authStudentControllers");
const adminStudentControllers = require("./controllers/adminControllers/adminStudentControllers");


module.exports = { ...authAdminControllers, ...adminStudentControllers, ...authStudentControllers };