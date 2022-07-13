"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sessions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.sessions.belongsTo(models.users, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  sessions.init(
    {
      expires: DataTypes.DATE,
      session_token: DataTypes.STRING,
      pay_token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "sessions",
    }
  );
  return sessions;
};
