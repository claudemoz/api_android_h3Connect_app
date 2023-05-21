const router = require('express').Router();
const appointmentControllers = require('@controllers/appointment.controllers');
const { checkToken } = require('@middlewares/jwt.config');


//doctor
router.get('/doctor/:id_actor(\\d+)',                      appointmentControllers.getAllAppointmentByDoctor);

//patient
router.get('/patient/:id_actor(\\d+)',                      appointmentControllers.getAllAppointmentByPatient);

//common
router.get('/:id_appointment(\\d+)', appointmentControllers.getOneAppointment);
router.post('/add-appointment',      appointmentControllers.addAppointment);



module.exports = router;