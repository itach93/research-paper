'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Papers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [5 - 20]
        }
      },
      abstract: {
        type: Sequelize.STRING,
        allowNull: false
      },
      keywords: {
        type: Sequelize.STRING
      },
      pages: {
        type: Sequelize.INTEGER
      },
      ref: {
        type: Sequelize.STRING
      },
      manuscript: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('Submitted', 'In Review', 'Reviewed', 'Accepted', 'Rejected'),
        allowNull: false
      },
      area_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Areas',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Papers');
  }
};