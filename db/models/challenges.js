"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class challenges extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.challenges.belongsTo(models.users, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  challenges.init(
    {
      value: DataTypes.STRING,
      user_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "challenges",
    }
  );
  return challenges;
};
