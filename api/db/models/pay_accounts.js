"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pay_accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.pay_accounts.belongsTo(models.users, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
      models.pay_accounts.belongsTo(models.currencies, {
        foreignKey: "currency_id",
        onDelete: "CASCADE",
      });
    }
  }
  pay_accounts.init(
    {
      pay_id: DataTypes.STRING,
      balance: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "pay_accounts",
    }
  );
  return pay_accounts;
};
