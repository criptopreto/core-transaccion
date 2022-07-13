"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("credentials", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn("uuid_generate_v4"),
      },
      credential_id: {
        type: Sequelize.STRING,
      },
      transports: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.STRING,
      },
      credential_public_key: {
        type: Sequelize.STRING,
      },
      counter: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("credentials");
  },
};
