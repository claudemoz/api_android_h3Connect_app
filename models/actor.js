const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const actor = sequelize.define('actor',{
    id_actor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    id_feature: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'feature',
        key: 'id_feature'
      }
    },
    name: {
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
    avatar:{
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://firebasestorage.googleapis.com/v0/b/androidapph3connect.appspot.com/o/images%2Fdefault_profil.jpg?alt=media&token=fc4d9bf2-ace0-4471-8595-a6991912f20d"
    },
    address:{
      type:DataTypes.STRING,
      allowNull: true,
      default: null
    }, 
    tel:{
      type:DataTypes.STRING,
      allowNull: true,
      default: null
    }, 
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, 
  {
    hooks: {
      beforeCreate: async (actor) => {
        if (actor.password) {
          const salt = await bcrypt.genSalt();
          const hashedPassword = await bcrypt.hash(actor.password, salt);
          actor.password = hashedPassword;
        }

        if (actor.name) {
          actor.name = actor.name.charAt(0).toUpperCase() + actor.name.slice(1).toLowerCase();
        }

        if (actor.email) {
          actor.email = actor.email.toLowerCase();
        }
      }
    },
    tableName: 'actor',
    freezeTableName: true,
  })

  actor.associate = function(models){
    actor.hasMany(models.asso_actor_date, { foreignKey: 'id_actor' });
    actor.belongsTo(models.feature, { foreignKey: 'id_feature' });

    actor.hasMany(models.appointment, {foreignKey: 'id_doctor' });
    actor.hasMany(models.appointment, {foreignKey: 'id_actor' });
  }
  return actor;
};
