module.exports = (sequelize, DataTypes) => {
  const asso_date_time = sequelize.define('asso_date_time',{
    id_asso_date_time: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_date: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'date',
        key: 'id_date'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    id_time:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'time',
        key: 'id_time'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
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
    tableName: 'asso_date_time',
    // freezeTableName: true,
  });

  asso_date_time.associate = function(models){
    asso_date_time.belongsTo(models.date, {foreignKey: 'id_date' });
    asso_date_time.belongsTo(models.time, {foreignKey: 'id_time' });
  }

  return asso_date_time;
};