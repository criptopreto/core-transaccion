"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("accounts", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn("uuid_generate_v4"),
      },
      type: {
        type: Sequelize.STRING,
      },
      provider: {
        type: Sequelize.STRING,
      },
      account_id: {
        type: Sequelize.STRING,
      },
      refresh_token: {
        type: Sequelize.STRING,
      },
      access_token: {
        type: Sequelize.STRING,
      },
      expires_at: {
        type: Sequelize.INTEGER,
      },
      token_type: {
        type: Sequelize.STRING,
      },
      scope: {
        type: Sequelize.STRING,
      },
      id_token: {
        type: Sequelize.STRING,
      },
      session_state: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("accounts");
  },
};
