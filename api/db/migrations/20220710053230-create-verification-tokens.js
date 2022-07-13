"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("verification_tokens", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn("uuid_generate_v4"),
      },
      token: {
        type: Sequelize.STRING,
      },
      identifier: {
        type: Sequelize.STRING,
      },
      expires: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("verification_tokens");
  },
};
