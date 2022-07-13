"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pays extends Model {
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
      models.pays.belongsTo(models.currencies, {
        foreignKey: "currency_principal",
        onDelete: "CASCADE",
        as: "c_currency_principal",
      });
      models.pays.belongsTo(models.currencies, {
        foreignKey: "currency_secondary",
        onDelete: "CASCADE",
        as: "c_currency_secondary",
      });
    }
  }
  pays.init(
    {
      actual_exchange_fee: DataTypes.FLOAT,
      currency_principal: DataTypes.UUID,
      currency_secondary: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "pays",
    }
  );
  return pays;
};
