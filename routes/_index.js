const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('@config/swagger.json');

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/auth', require('@routes/auth.routes'));
router.use('/actor', require('@routes/actor.routes'));
router.use('/date_time', require('@routes/dateTime.routes'));
router.use('/appointment', require('@routes/appointment.routes'));

module.exports = router;