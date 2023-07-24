const adminRouter = require('express').Router();

adminRouter.use('/student', require('./adminRoutes/adminStudentRoutes'));

module.exports = adminRouter;