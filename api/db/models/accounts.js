"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.accounts.belongsTo(models.users, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  accounts.init(
    {
      type: DataTypes.STRING,
      provider: DataTypes.STRING,
      account_id: DataTypes.STRING,
      refresh_token: DataTypes.STRING,
      access_token: DataTypes.STRING,
      expires_at: DataTypes.INTEGER,
      token_type: DataTypes.STRING,
      scope: DataTypes.STRING,
      id_token: DataTypes.STRING,
      session_state: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "accounts",
    }
  );
  return accounts;
};
