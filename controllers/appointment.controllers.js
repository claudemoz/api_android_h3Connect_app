const { sequelize } = require('@models');
const  moment  = require('moment');
const locale = moment.locale('fr');

const { 
  appointment, 
  date,
  time,
  asso_actor_date,
  asso_date_time,
  actor
 } = sequelize.models;
// const bcrypt = require('bcrypt');

exports.addDateTime = async (req, res)=>{
  const {id_actor, date_value, time_value} = req.body;

  try {
    await sequelize.transaction(async (t) => {

        const _date = await date.create({date:date_value}, { transaction: t });
        const _time = await time.create({time:time_value}, { transaction: t });
          console.log("id_actor ", parseInt(id_actor));
        // await asso_actor_date.create({id_actor: id_actor, id_date: _date.id_date}, { transaction: t });
        // await asso_date_time.create({id_date:_date.id_date, id_time:_time.id_time}, { transaction: t });

       const result = await Promise.all([
        asso_actor_date.create({id_actor: parseInt(id_actor), id_date: _date.id_date}, { transaction: t }),
        asso_date_time.create({id_date:_date.id_date, id_time:_time.id_time}, { transaction: t })
       ])
       
        if(result) return res.status(200).json({
          success: true,
          msg: 'Date ajouté avec succès'
        })
    })
  } catch (e) {
      console.log(e);
      return res.status(500).send();
  }
}
exports.addTimeToDate = async (req, res)=>{
  const {id_date, time_value} = req.body;
  try {
        const _time = await time.create({time:time_value});
        await asso_date_time.create({id_date:id_date, id_time:_time.id_time});
        return res.status(200).send("time created")
      
  } catch (e) {
      console.log(e);
      return res.status(500).send();
  }
}

exports.addAppointment = async (req, res) => {
  const { id_actor, id_date, id_time, id_doctor } = req.body;

  if(!id_actor || !id_date || !id_time || !id_doctor){
    res.status(400).json({msg: 'missing data'});
    return;
  } 

  try {
    asso_date_time.update({isActive: false}, {
      where:{
        id_time: id_time
    }});
    
    const result = await appointment.create({id_actor, id_date, id_time, id_doctor})
    if(result){
      return res.status(200).json({
        success: true,
        msg: "appointment successfully registered"
      });
    }
  } catch (e) {
      return res.status(500).send();
  }
}

exports.getAllAppointmentByPatient = async (req, res) => {
  try {
    const result = await appointment.findAll({
      attributes:['id_appointment','id_actor','id_date','id_time','id_doctor'],
      where:{
        id_doctor: req.params.id_actor
      },
      include:[{
        model:actor,
        as: 'patient',
        attributes:['name', 'avatar']
      },{
        model: date,
        attributes:['id_date', 'date']
      },{
        model: time,
        attributes:['id_time', 'time']
      }]
    })
    
    if(result){
      const appointment = JSON.parse(JSON.stringify(result))
        const _appointment = appointment.map(d => {
            d.date.date = moment(d?.date?.date).locale(locale).format('dddd DD MMMM')
            d.time.time = moment(d.time.time, 'HH:mm:ss').locale(locale).format('HH:mm')  
            return d;
            });

        if(_appointment) return res.status(200).json({
          success: true,
          data: _appointment
        });
      }

  } catch (e) {
    console.log(e);
      return res.status(500).send();
  }
}
exports.getAllAppointmentByDoctor = async (req, res) => {
  try {
    const result = await appointment.findAll({
      attributes:['id_appointment','id_actor','id_date','id_time','id_doctor'],
      where:{
        id_doctor: req.params.id_actor
      },
      include:[{
        model:actor,
        as: 'doctor',
        attributes:['name','avatar']
      },{
        model: date,
        attributes:['id_date', 'date']
      },{
        model: time,
        attributes:['id_time', 'time']
      }]
    })

    if(result){
      const appointment = JSON.parse(JSON.stringify(result))
        const _appointment = appointment.sort((a, b) => a.date.date.localeCompare(b.date.date)).map(d => {
            d.date.date = moment(d?.date?.date).locale(locale).format('dddd DD MMMM')
            d.time.time = moment(d.time.time, 'HH:mm:ss').locale(locale).format('HH:mm')  
            return d;
            })
        if(_appointment) {
          // console.log(_appointment);
          return res.status(200).json({
            success: true,
            data: _appointment
          });
        }
      }
  } catch (e) {
      return res.status(500).send();
  }
}

exports.getOneAppointment = async (req, res) => {
  const { id_appointment } = req.params;
    try {
      const result = await appointment.findOne({
        where:{
          id_appointment: id_appointment
        }
      })
      if(result) return res.status(200).send(result);
    } catch (e) {
        return res.status(500).send();
    }
}