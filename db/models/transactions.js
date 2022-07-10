"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    toJSON() {
      // hide protected fields
      const attributes = { ...this.get() };
      // eslint-disable-next-line no-restricted-syntax
      // for (const a of PROTECTED_ATTRIBUTES) {
      //   delete attributes[a];
      // }
      return attributes;
    }

    static associate(models) {
      models.transactions.belongsTo(models.users, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
      models.transactions.belongsTo(models.pay_accounts, {
        foreignKey: "account_id",
        onDelete: "CASCADE",
      });
      models.transactions.belongsTo(models.pay_accounts, {
        foreignKey: "destinatary_id",
        onDelete: "CASCADE",
      });
      models.transactions.belongsTo(models.currencies, {
        foreignKey: "currency_id",
        onDelete: "CASCADE",
      });
    }
  }
  transactions.init(
    {
      amount: DataTypes.FLOAT,
      crypto_hash: DataTypes.STRING,
      type: {
        type: DataTypes.INTEGER,
        get() {
          return TYPES_TRANSACTIONS[this.getDataValue("type")];
        },
      },
      exchange_fee: DataTypes.FLOAT,
      status: DataTypes.STRING,
      comments: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "transactions",
    }
  );
  return transactions;
};

const TYPES_TRANSACTIONS = {
  1: "Debit",
  2: "Credit",
};
