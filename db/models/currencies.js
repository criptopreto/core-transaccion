"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class currency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  currency.init(
    {
      name: DataTypes.STRING,
      symbol: DataTypes.STRING,
      value: DataTypes.FLOAT,
      principal: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "currencies",
    }
  );
  return currency;
};
