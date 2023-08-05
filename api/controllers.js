const authStudentControllers = require("./controllers/authControllers/authStudentControllers");
const adminStudentControllers = require("./controllers/adminControllers/adminStudentControllers");


module.exports = { ...adminStudentControllers, ...authStudentControllers };