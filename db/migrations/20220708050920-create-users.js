"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn("uuid_generate_v4"),
      },
      id_card: {
        type: Sequelize.STRING(25),
      },
      first_name: {
        type: Sequelize.STRING(70),
      },
      last_name: {
        type: Sequelize.STRING(75),
      },
      name: {
        type: Sequelize.STRING(150),
      },
      username: {
        type: Sequelize.STRING(20),
      },
      hash: {
        type: Sequelize.STRING,
      },
      salt: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING(100),
      },
      phone: {
        type: Sequelize.STRING(25),
        unique: true,
      },
      birthday: {
        type: Sequelize.DATE,
      },
      country: {
        type: Sequelize.STRING(35),
      },
      gender: {
        type: Sequelize.STRING(15),
      },
      status: {
        type: Sequelize.STRING(15),
      },
      staff: {
        type: Sequelize.BOOLEAN,
      },
      role: {
        type: Sequelize.STRING(15),
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
    await queryInterface.dropTable("users");
  },
};
