"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("currencies", [
      {
        id: "735d30d4-ece9-4a34-84d8-2371f1d76879",
        name: "Dólar Americano",
        symbol: "USD",
        value: 1,
        principal: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "32bd6796-91e9-4416-82f9-581e7c0f4813",
        name: "Caracas Token",
        symbol: "CCSUSD",
        value: 1,
        principal: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "a96ecc11-e176-48d9-967d-c4d9e456e64a",
        name: "Bolívar",
        symbol: "BS",
        value: 5.61,
        principal: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("currencies", null, {});
  },
};
