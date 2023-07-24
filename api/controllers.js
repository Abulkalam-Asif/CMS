const adminStudentControllers = require("./controllers/adminControllers/adminStudentControllers");

const studentControllers = require("./controllers/studentControllers");


module.exports = { ...adminStudentControllers, ...studentControllers };