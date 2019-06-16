'use strict';
module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('Area', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, { tableName: 'Areas' });
  Area.associate = function(models) {
    Area.hasMany(models.Paper, {
      foreignKey: 'area_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  };
  return Area;
};