"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pays extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pays.init(
    {
      actual_exchange_fee: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "pays",
    }
  );
  return pays;
};
