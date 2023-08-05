const router = require('express').Router();

router.use('/auth', require('./routes/authRoutes'));
router.use('/admin', require('./routes/adminRoutes'));

module.exports = router;