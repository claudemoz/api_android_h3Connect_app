const router = require('express').Router();

router.use('/doc', (req, res)=>{
    res.json('Bienvenue sur la documentation')
});
router.use('/auth', require('@routes/auth.routes'));
router.use('/users', require('@routes/user.routes'));

module.exports = router;