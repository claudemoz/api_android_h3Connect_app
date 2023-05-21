
module.exports = (sequelize, DataTypes) => {
  const feature = sequelize.define('feature',{
    id_feature: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    label_feature: {
      allowNull: false,
      type: DataTypes.STRING
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
    tableName: 'feature',
    freezeTableName: true,
  });

  feature.associate = function(models){
    feature.hasMany(models.actor, {foreignKey: 'id_feature' });
  }

  return feature;
};