const { sequelize } = require('@models');
const { actor } = sequelize.models;
const  moment  = require('moment');
const locale = moment.locale('fr');

exports.createActor = async (req, res, next)=>{
  const { name, email, password, passwordConfirm } = req.body;
  // const salt = await bcrypt.genSalt();
  // const hashedPassword = await bcrypt.hash(password, salt);
  if(!name || !email || !password || !passwordConfirm){
    res.status(400).json({msg: 'missing data'});
    return;
  }
  if(password !== passwordConfirm){
    res.status(400).json({msg: 'passwords do not match'});
    return;
  }

  try {
    const _actor = await actor.findOne({
      attributes: { 
        exclude: ['password'] 
      },
      where:{
        email:email
      }, 
      logging:false
    });

    if(!_actor){
      const newActor = await actor.create({id_feature:1, name, email, password, logging: false })
      if(newActor){
        return res.status(200).json({
          success: true,
          msg: 'compte créé avec succès'
        })
      }
    }else{
      return res.status(409).json({msg: 'user already exit'});
    }
  } catch (error) {
    console.log(error);
    Object.keys(error.errors).map(key => error.errors[key].validatorKey === "isEmail" ? res.status(500).send({msg: "Invalide email"}) : error)
  }
    
}


exports.getAllDoctor = async(req, res, next)=>{
  try {
    const result = await actor.findAll({
      where:{
        id_feature: 2
      }
    })

    if(result){
      const __result = JSON.parse(JSON.stringify(result));
      __result.forEach(e => {
        delete e.password
        e.id_actor = parseInt(e.id_actor)

        return e;
      })
      return res.status(200).json({
        success: true,
        data: __result
      });
    } 

  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
}   
 
exports.getActorById = async(req, res, next)=>{
  try {
    const _actor = await actor.findOne({
      where:{
        id_actor: req.params.id_actor
      }
    })

    if(_actor){
      const __actor = JSON.parse(JSON.stringify(_actor));
      __actor.date = moment(new Date()).locale(locale).format('dddd DD MMMM YYYY')
      delete __actor.password

      return res.status(200).json({
        success: true,
        data: __actor
      });
    }

  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
}   

exports.updateActorById = async(req, res, next)=>{
  const {image, name, email, address, tel} = req.body
  try {
    const result = await actor.update({avatar:image, name, email, address, tel},{
      where:{
        id_actor: req.params.id_actor
      }
    })

    if(result){
      return res.status(200).json({
        success: true,
        msg:"data updated"
      });
    }

  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
}   