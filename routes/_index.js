const router = require('express').Router();

// router.use('/doc');
router.use('/auth', require('@routes/auth.routes'));
router.use('/users', require('@routes/user.routes'));

module.exports = router;