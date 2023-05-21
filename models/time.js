
module.exports = (sequelize, DataTypes) => {
  const time = sequelize.define('time',{
    id_time: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
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
    tableName: 'time',
    freezeTableName: true,
  });

  time.associate = function(models){
    time.hasMany(models.asso_date_time, {foreignKey: 'id_time' });
    time.belongsTo(models.appointment, {foreignKey: 'id_time' });
  }

  return time;
};