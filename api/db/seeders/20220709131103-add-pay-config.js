"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("pays", [
      {
        actual_exchange_fee: 2.5,
        currency_principal: "32bd6796-91e9-4416-82f9-581e7c0f4813",
        currency_secondary: "a96ecc11-e176-48d9-967d-c4d9e456e64a",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("pays", null, {});
  },
};
