'use strict';
module.exports = (sequelize, DataTypes) => {
  const Issue = sequelize.define('Issue', {
    publishDate: DataTypes.DATE,
    publishNum: DataTypes.STRING
  }, { tableName: 'Issues' });
  Issue.associate = function(models) {
    Issue.belongsTo(models.Paper, {
      foreignKey: 'paperId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  };
  return Issue;
};