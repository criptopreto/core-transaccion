"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("currencies", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn("uuid_generate_v4"),
      },
      name: {
        type: Sequelize.STRING,
      },
      symbol: {
        type: Sequelize.STRING,
      },
      value: {
        type: Sequelize.FLOAT,
      },
      principal: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("currencies");
  },
};
