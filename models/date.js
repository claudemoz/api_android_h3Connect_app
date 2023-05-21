module.exports = (sequelize, DataTypes) => {
  const date = sequelize.define('date', {
    id_date: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    date: {
      type: DataTypes.DATE,
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
    tableName: 'date',
    freezeTableName: true,
  });

  date.associate = function(models){
    date.hasMany(models.asso_actor_date, {foreignKey: 'id_date' });
    date.hasMany(models.asso_date_time, {foreignKey: 'id_date' });
    date.hasMany(models.appointment, {foreignKey: 'id_date'});
  }

  return date;
};