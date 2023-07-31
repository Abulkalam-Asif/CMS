const adminRouter = require('express').Router();

adminRouter.use('/student', require('./adminRoutes/adminStudentRoutes'));
adminRouter.use('/teacher', require('./adminRoutes/adminTeacherRoutes'));

module.exports = adminRouter;