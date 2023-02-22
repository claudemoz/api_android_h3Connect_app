// const { sequelize } = require('@models');
const { User } = require('@models').sequelize.models;
const bcrypt = require('bcrypt');
const { createToken } = require('@middlewares/jwt.config');

exports.login = async (req, res, next)=>{
  const { email, password } = req.body
  try {
    const user = await User.findOne({where:{email:email}});
    if(!user){
      res.status(400).json({
        success: false,
        msg: 'user does not exist'
      })
        
    }else{
      const checkPassword = await bcrypt.compare(password, user.password)
      if(checkPassword){
        return res.status(200).json({
          success: true,
          msg:'successful authentification',
          token: createToken(user),
          user: user
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