'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'address',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'Users',
        'zip',
        {
          type: Sequelize.STRING
        }
      )
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users',  'address'),
      queryInterface.removeColumn('Users', 'zip')
    ])
  }
};
