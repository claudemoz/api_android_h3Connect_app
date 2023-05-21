module.exports = (sequelize, DataTypes) => {
  const asso_actor_date = sequelize.define('asso_actor_date',{
    id_asso_actor_date: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_actor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'actor',
        key: 'id_actor'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    id_date:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: 'date',
        key: 'id_date'
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
    },
  },
  {
    tableName: 'asso_actor_date',
    freezeTableName: true,
  });

  asso_actor_date.associate = function(models){
    asso_actor_date.belongsTo(models.actor, {foreignKey: 'id_actor' });
    asso_actor_date.belongsTo(models.date, {foreignKey: 'id_date' });
  }
  return asso_actor_date;
};