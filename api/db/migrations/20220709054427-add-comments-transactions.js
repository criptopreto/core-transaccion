"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "transactions", // name of Source model
      "comments", // name of the key we're adding
      {
        type: Sequelize.STRING(200),
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      "transactions", // name of Source model
      "comments" // key we want to remove
    );
  },
};
