'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [6 - 15]
        // msg: "username must be atleast 6 characters in length"
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING
    },
    firstname: {
      type: DataTypes.STRING
    },
    lastname: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.ENUM('M', 'F')
    },
    dbirth: {
      type: DataTypes.DATE
    },
    city: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.ENUM('Mr', 'Mrs', 'Dr', 'Pr')
    },
    institute: {
      type: DataTypes.STRING
    },
    biography: {
      type: DataTypes.STRING
    },
    department: {
      type: DataTypes.STRING
    },
    postal_code: {
      type: DataTypes.STRING
    },
    about_yourself: {
      type: DataTypes.STRING
    },
    cv: {
      type: DataTypes.STRING
    },
    user_image: {
      type: DataTypes.STRING
    }
  }, { tableName: 'Users' });
  User.associate = function (models) {
    User.belongsTo(models.Role, {
      foreignKey: 'role_id',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.Paper, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    User.hasMany(models.Assignment, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return User;
};