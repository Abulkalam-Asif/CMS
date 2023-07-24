const router = require('express').Router();

router.use('/admin', require('./routes/adminRoutes'));
router.use('/student', require('./routes/studentRoutes'));

module.exports = router;