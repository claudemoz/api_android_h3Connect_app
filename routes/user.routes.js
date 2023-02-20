const router = require('express').Router();
const userControllers = require('@controllers/user.controllers');
const { checkToken } = require('@middlewares/jwt.config');

router.post('/register', userControllers.createUser);
router.get('/list', checkToken, userControllers.fetchList );

module.exports = router;