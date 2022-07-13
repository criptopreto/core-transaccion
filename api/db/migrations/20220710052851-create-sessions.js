"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sessions", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn("uuid_generate_v4"),
      },
      expires: {
        type: Sequelize.DATE,
      },
      session_token: {
        type: Sequelize.STRING,
      },
      pay_token: {
        type: Sequelize.STRING(1000),
      },
      user_id: {
        type: Sequelize.UUID,
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
    await queryInterface.dropTable("sessions");
  },
};
