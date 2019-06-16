'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    status: {
      type: DataTypes.ENUM('A', 'CA', 'CR', 'OR')
    },
    comment: {
      type: DataTypes.STRING
    }
  }, { tableName: 'Reviews' });
  Review.associate = function(models) {
    Review.belongsTo(models.Paper, {
      foreignKey: 'paper_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  };
  return Review;
};