// const { sequelize } = require('@models');
const { actor } = require('@models').sequelize.models;
const bcrypt = require('bcrypt');
const { createToken } = require('@middlewares/jwt.config');

exports.login = async (req, res, next)=>{
  const { email, password } = req.body
  try {
    const _actor = await actor.findOne({
      where:{
        email:email
      },
      logging: false
    });
    if(!_actor){
      res.status(400).json({
        success: false,
        msg: 'user does not exist'
      })
        
    }else{
      const checkPassword = await bcrypt.compare(password, _actor.password)
      if(checkPassword){
        const __actor = JSON.parse(JSON.stringify(_actor));
        delete __actor.password
        return res.status(200).json({
          success: true,
          msg:'successful authentification',
          token: createToken(_actor),
          id_actor: _actor.id_actor,
          actor: __actor
        })
      }else{
        res.status(400).json({success: false, msg: 'Invalid email or password'})
      }

    }
  } catch (e) {
    console.log(e);
    res.status(500).send()
  }

}

exports.logout = (req, res, next)=>{

}