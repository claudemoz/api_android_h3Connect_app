'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: true,  
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_img:{
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    // instanceMethods: {
    //   /**
    //    * Valid password of an actor
    //    * @param {*} password
    //    */
    //   checkPassword: async (password) =>{
    //     if(password) {
    //       return await bcrypt.compare(password, this.password)
    //     }else{
    //       throw new Error("Password might be empty");
    //     }
    //   }
    // },
    hooks: {
      beforeCreate: (async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt();
          const hashedPassword = await bcrypt.hash(user.password, salt);
          user.password = hashedPassword;
        }

        if (user.username) {
          user.username = user.username.charAt(0).toUpperCase() + user.username.slice(1);
        }
      })
    },
    sequelize,
    modelName: 'User',
    freezeTableName: true
  })
  return User;
};

// User.beforeCreate(async (user) => {
//   if (user.password) {
//     const salt = becrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(user.password, salt);
//     user.password = hashedPassword;
//   }
//   if (user.lastname) {
//     user.lastname = user.lastname.toUpperCase();
//   }
//   if (user.firstname) {
//     user.firstname = user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1);
//   }
//   if (user.email) {
//     user.email = user.email.toLowerCase();
//   }
// })