'use strict';
module.exports = (sequelize, DataTypes) => {
  const Paper = sequelize.define('Paper', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5 - 30]
      }
    },
    abstract: {
      type: DataTypes.STRING,
      allowNull: false
    },
    keywords: {
      type: DataTypes.STRING
    },
    manuscript: {
      type: DataTypes.STRING
    },
    ref_number: {
      type: DataTypes.STRING
    },
    current_paper: {
      type: DataTypes.BOOLEAN
    },
    assigned: {
      type: DataTypes.BOOLEAN
    },  
    pages: DataTypes.INTEGER,
    // ref: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('Submitted', 'In Review', 'Reviewed', 'Accepted', 'Rejected'),
      allowNull: false
    }
  }, { tableName: 'Papers' });
  Paper.associate = function (models) {
    Paper.belongsTo(models.Area, {
      foreignKey: 'area_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    Paper.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    Paper.hasMany(models.Issue, {
      foreignKey: 'paper_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    Paper.hasMany(models.Review, {
      foreignKey: 'paper_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    Paper.hasMany(models.Assignment, {
      foreignKey: 'paper_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Paper;
};