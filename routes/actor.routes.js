const router = require('express').Router();
const actorControllers = require('@controllers/actor.controllers');
const upload = require('@controllers/upload.controllers');
const { checkToken } = require('@middlewares/jwt.config');

router.get('/doctor/list',                  actorControllers.getAllDoctor);
router.get('/:id_actor(\\d+)',       actorControllers.getActorById);
router.put('/update/:id_actor(\\d+)',       actorControllers.updateActorById);
router.post('/register',                           actorControllers.createActor);
router.post('/upload/profile/:id_actor(\\d+)',                   checkToken,        upload.uploadProfile);

module.exports = router;