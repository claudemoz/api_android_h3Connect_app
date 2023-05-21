module.exports = (sequelize, DataTypes) => {
  const appointment = sequelize.define('appointment',{
    id_appointment: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_actor: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{
        model: 'actor',
        key: 'id_actor'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    id_date: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{
        model: 'date',
        key: 'id_date'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    id_time: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{
        model: 'time',
        key: 'id_time'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    id_doctor: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{
        model: 'actor',
        key: 'id_actor'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
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
    tableName: 'appointment',
    freezeTableName: true,
  });

  appointment.associate = function(models){
    appointment.belongsTo(models.actor, {foreignKey: 'id_doctor', as:'doctor' });
    appointment.belongsTo(models.actor, {foreignKey: 'id_actor', as: 'patient' });
    appointment.belongsTo(models.time, {foreignKey: 'id_time'});
    appointment.belongsTo(models.date, {foreignKey: 'id_date'});
  }
  return appointment;
};