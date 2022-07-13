"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "users", // name of Source model
      "image", // name of the key we're adding
      {
        type: Sequelize.STRING(250),
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      "users", // name of Source model
      "image" // key we want to remove
    );
  },
};
