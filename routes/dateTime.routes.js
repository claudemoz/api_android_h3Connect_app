const router = require('express').Router();
const dateTime = require('@controllers/dateTime.controllers');
const { checkToken } = require('@middlewares/jwt.config');

//doctor
router.post('/doctor-plannig/add-date-time',              checkToken,  dateTime.addDateTime);
router.post('/doctor-plannig/add-time-to-date',                        dateTime.addTimeToDate);
router.get('/date-time-list/:id_actor(\\d+)',                          dateTime.getAllDateTimeByActor);
router.get('/time-list/:id_date(\\d+)',                          dateTime.getAllTimeToDateByActor);

router.put('/doctor-plannig/update/:id_date(\\d+)',       checkToken,  dateTime.updateDate)
router.delete('/doctor-plannig/delete/:id_date(\\d+)',    checkToken,  dateTime.deleteDate)


module.exports = router;