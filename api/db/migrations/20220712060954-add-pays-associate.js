"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn(
      "pays", // name of Source model
      "currency_principal", // name of the key we're adding
      {
        type: Sequelize.UUID,
        references: {
          model: "currencies", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    );
    return queryInterface.addColumn(
      "pays", // name of Source model
      "currency_secondary", // name of the key we're adding
      {
        type: Sequelize.UUID,
        references: {
          model: "currencies", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn(
      "pays", // name of Source model
      "currency_principal" // key we want to remove
    );
    return queryInterface.removeColumn(
      "pays", // name of Source model
      "currency_secondary" // key we want to remove
    );
  },
};
