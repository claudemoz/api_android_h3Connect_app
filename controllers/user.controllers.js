const { sequelize } = require('@models');
const { User } = sequelize.models;
// const bcrypt = require('bcrypt');

exports.createUser = async (req, res, next)=>{
    const { username, email, password, passwordConfirm } = req.body;
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(password, salt);

    try {
        if(!email || !password || !passwordConfirm){
            res.status(400).json({msg: 'missing data'});
        }
        if(password !== passwordConfirm){
            res.status(400).json({msg: 'passwords do not match'});
        }

        const user = await User.findOne({attributes: { exclude: ['password'] },where:{email:email}});
        if(user){
            res.status(409).json({msg: 'user already exit'});
        }
        const newUser = await User.create({username, email, password })
        if(newUser){
            return res.status(200).json({
                success: true,
                msg: 'user created'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
    
}


exports.fetchList = async(req, res, next)=>{
    res.status(200).send(req.user);
}