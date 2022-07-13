"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn(
      "pay_accounts", // name of Source model
      "user_id", // name of the key we're adding
      {
        type: Sequelize.UUID,
        references: {
          model: "users", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    );
    return queryInterface.addColumn(
      "pay_accounts", // name of Source model
      "currency_id", // name of the key we're adding
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
      "pay_accounts", // name of Source model
      "user_id" // key we want to remove
    );
    return queryInterface.removeColumn(
      "pay_accounts", // name of Source model
      "currency_id" // key we want to remove
    );
  },
};
