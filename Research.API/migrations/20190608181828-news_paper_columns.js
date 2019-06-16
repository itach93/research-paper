'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Papers',
        'ref_number',
        {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        }
      ),
      queryInterface.addColumn(
        'Papers',
        'current_paper',
        Sequelize.BOOLEAN
      ),
      queryInterface.addColumn(
        'Papers',
        'assigned',
        Sequelize.BOOLEAN
      ),
      queryInterface.addColumn(
        'Papers',
        'author',
        Sequelize.STRING
      ),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Papers', 'ref_number'),
      queryInterface.removeColumn('Papers', 'current_paper'),
      queryInterface.removeColumn('Papers', 'assigned'),
      queryInterface.removeColumn('Papers', 'author')
    ])
  }
};
