const jwt = require('jsonwebtoken');
const SECRET = "31be40a5-8cbc-44da-acce-fe16478db100";
const { sequelize } = require('@models');
const { actor } = sequelize.models

exports.createToken = (actor)=>{
  const token = jwt.sign({ sub: parseInt(actor.id_actor) }, SECRET);
  return token;
}

exports.checkToken = async (req, res, next)=>{
  const token = req.header('Authorization');

  if(!token){
    return res.status(401).json({msg: 'Authorization denied'})
  }else{
    try {
        await jwt.verify(token, SECRET, async (err, decoded)=>{
          if(err){
            return res.status(401).json({msg: 'Token not valid'})
          }else{
            const _actor = await actor.findOne({attributes: { exclude: ['password'] }, where:{id_actor: decoded.sub}});
            if(_actor){
              req.actor = _actor;
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