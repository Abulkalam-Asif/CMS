const authRouter = require('express').Router();

authRouter.use('/admin', require('./authRoutes/authAdminRoutes'));
authRouter.use('/student', require('./authRoutes/authStudentRoutes'));
authRouter.use('/teacher', require('./authRoutes/authTeacherRoutes'));

module.exports = authRouter;