'use strict';
module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('Assignment', {
    assign_by: DataTypes.STRING,
    status: DataTypes.STRING,
    comment: DataTypes.STRING
  }, { tableName: 'Assignments' });
  Assignment.associate = function(models) {
    Assignment.belongsTo(models.Paper, {
      foreignKey: 'paper_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    Assignment.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Assignment;
};