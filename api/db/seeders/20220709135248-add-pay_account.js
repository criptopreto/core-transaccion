"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("pay_accounts", [
      {
        id: "b6c9faaf-d8d9-4f55-bc10-17216657f9db",
        pay_id: "12345678",
        balance: 0,
        user_id: "ee774408-7dda-4085-84e2-d45b27ceab68",
        currency_id: "32bd6796-91e9-4416-82f9-581e7c0f4813",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("pay_accounts", null, {});
  },
};
