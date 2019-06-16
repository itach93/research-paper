'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users',
      'country',
      Sequelize.STRING
    );

  },

  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'Users',
      'country'
    );
  }
};
