const { sequelize } = require('@models');
const  moment  = require('moment');
const locale = moment.locale('fr');

const { 
  date,
  time,
  asso_actor_date,
  asso_date_time
 } = sequelize.models;
 
exports.addDateTime = async (req, res)=>{
  const {id_actor, date_value, time_value} = req.body;
  try {
    await sequelize.transaction(async (t) => {

        const _date = await date.create({date:moment(date_value).format('YYYY-MM-DD HH:mm:ss')}, { transaction: t });
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
        return res.status(200).json({
          success: true,
          msg: "time created"
        });      
      
  } catch (e) {
      console.log(e);
      return res.status(500).send();
  }
}

exports.getAllDateTimeByActor = async (req, res) => {
    const { id_actor } = req.params;
    try {
      const result = await asso_actor_date.findAll({
        attributes: ['id_actor','id_date'],
        where: {
          id_actor: id_actor
        },
        include:[{
          model: date,
          attributes: ['id_date', 'date'],
          required: true,
          include:[{
            model: asso_date_time,
            attributes: ['id_date', 'id_time','isActive'],
            where:{
              isActive: true
            },
            include: [{
              model: time,
              attributes: ['id_time', 'time'],
              required: true,
            }]
          }]
        }
      ],
      logging: false
      })
  
      if(result){
        const dateTime = JSON.parse(JSON.stringify(result))
        const newDateTime = dateTime.sort((a, b) => a.date.date.localeCompare(b.date.date)).map(d => {
            d.date.date = moment(d?.date?.date).locale(locale).format('dddd DD MMMM')
            d.date.asso_date_times.forEach(t=>{
              t.time.time = moment(t.time.time, 'HH:mm:ss').locale(locale).format('HH:mm')  
            });
            d.date.asso_date_times.sort((a, b) => a.time.time.localeCompare(b.time.time));
            return d;
        });

        if(newDateTime) return res.status(200).json({
          success: true,
          data: newDateTime
        });
      }

    } catch (e) {
      console.log(e);
        return res.status(500).send();
    }
}
exports.getAllTimeToDateByActor = async (req, res) => {
    const { id_date } = req.params;
    try {
      const result = await asso_date_time.findAll({
        where: {
          id_date: id_date
        },
        include:[{
          model: time,
            attributes: ['id_time', 'time'],
            required: true,
        }],
      logging: console.log
      })
  
      if(result) return res.status(200).json({
      success: true,
      data: result
      });
    } catch (e) {
      console.log(e);
        return res.status(500).send();
    }
}

exports.updateDate = async (req, res)=>{
    const {id_date} = req.params;
    const {date_value} = req.body
    try {
          const result = await date.update({
            date:date_value
          },
            { where:
              { 
                id_date: id_date
              },
              logging: false
            });

          if(result) return res.status(200).json({
            success: true,
            msg: "date updated"
          })       
        
    } catch (e) {
        console.log(e);
        return res.status(500).send();
    }
}

exports.deleteDate = async (req, res)=>{
    const {id_date} = req.params;
    try {
          const result = await date.destroy({ where:{ id_date: id_date }});
          if(result) return res.status(200).json({
            success: true,
            msg: "date deleted"
          })       
        
    } catch (e) {
        console.log(e);
        return res.status(500).send();
    }
}
