"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pay_accounts", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn("uuid_generate_v4"),
      },
      pay_id: {
        type: Sequelize.STRING(10),
      },
      balance: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("pay_accounts");
  },
};
