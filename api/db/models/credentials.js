"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class credentials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  credentials.init(
    {
      credential_id: DataTypes.STRING,
      transports: DataTypes.STRING,
      user_id: DataTypes.STRING,
      credential_public_key: DataTypes.STRING,
      counter: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "credentials",
    }
  );
  return credentials;
};
