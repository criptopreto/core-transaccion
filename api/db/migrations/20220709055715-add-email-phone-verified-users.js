"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn(
      "users", // name of Source model
      "email_verified", // name of the key we're adding
      {
        type: Sequelize.STRING(100),
        defaultValue: false,
      }
    );
    queryInterface.addColumn(
      "users", // name of Source model
      "pay_email_verified", // name of the key we're adding
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    );
    queryInterface.addColumn(
      "users", // name of Source model
      "phone_verified", // name of the key we're adding
      {
        type: Sequelize.STRING(100),
        defaultValue: false,
      }
    );
    queryInterface.addColumn(
      "users", // name of Source model
      "otp_email", // name of the key we're adding
      {
        type: Sequelize.STRING(10),
      }
    );
    return queryInterface.addColumn(
      "users", // name of Source model
      "otp_phone", // name of the key we're adding
      {
        type: Sequelize.STRING(10),
      }
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn(
      "users", // name of Source model
      "email_verified" // key we want to remove
    );
    queryInterface.removeColumn(
      "users", // name of Source model
      "pay_email_verified" // key we want to remove
    );
    queryInterface.removeColumn(
      "users", // name of Source model
      "otp_email" // key we want to remove
    );
    queryInterface.removeColumn(
      "users", // name of Source model
      "otp_phone" // key we want to remove
    );
    return queryInterface.removeColumn(
      "users", // name of Source model
      "phone_verified" // key we want to remove
    );
  },
};
