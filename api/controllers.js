const authAdminControllers = require("./controllers/authControllers/authAdminControllers");
const authStudentControllers = require("./controllers/authControllers/authStudentControllers");
const authTeacherControllers = require("./controllers/authControllers/authTeacherControllers");
const adminStudentControllers = require("./controllers/adminControllers/adminStudentControllers");
const adminTeacherControllers = require("./controllers/adminControllers/adminTeacherControllers");
const adminCourseControllers = require("./controllers/adminControllers/adminCourseControllers");


module.exports = { ...authAdminControllers, ...authStudentControllers, ...authTeacherControllers, ...adminStudentControllers, ...adminTeacherControllers, ...adminCourseControllers };