const jwt = require('jsonwebtoken');
const SECRET = "31be40a5-8cbc-44da-acce-fe16478db100";
const { sequelize } = require('@models');
const { User } = sequelize.models

exports.createToken = (user)=>{
  const token = jwt.sign({ sub: parseInt(user.id_user) }, SECRET);
  return token;
}

exports.checkToken = async (req, res, next)=>{
  const token = req.header('Authorization');

  if(!token){
    return res.status(401).json({msg: 'No token, authorization denied'})
  }else{
    try {
        await jwt.verify(token, SECRET, async (err, decoded)=>{
          if(err){
            res.status(401).json({msg: 'Token not valid'})
          }else{
            const user = await User.findOne({attributes: { exclude: ['password'] }, where:{id_user: decoded.sub}});
            if(user){
              req.user = user;
              next();
            }
          }
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({msg: e})
    }
  }
}