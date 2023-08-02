const adminRouter = require('express').Router();

adminRouter.use('/student', require('./adminRoutes/adminStudentRoutes'));
adminRouter.use('/teacher', require('./adminRoutes/adminTeacherRoutes'));
adminRouter.use('/course', require('./adminRoutes/adminCourseRoutes'));

module.exports = adminRouter;