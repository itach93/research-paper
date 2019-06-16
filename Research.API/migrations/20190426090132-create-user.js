'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [6 - 15]
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.ENUM('M', 'F')
      },
      dbirth: {
        type: Sequelize.DATE
      },
      city: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.ENUM('Mr', 'Mrs', 'Dr', 'Pr')
      },
      institute: {
        type: Sequelize.STRING
      },
      biography: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      postal_code: {
        type: Sequelize.STRING
      },
      about_yourself: {
        type: Sequelize.STRING
      },
      cv: {
        type: Sequelize.STRING
      },
      user_image: {
        type: Sequelize.STRING
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    return queryInterface.dropTable('Users');
  }
};