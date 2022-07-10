"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.users.hasMany(models.pay_accounts, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  users.init(
    {
      id_card: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      hash: DataTypes.STRING,
      salt: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      birthday: DataTypes.STRING,
      country: DataTypes.STRING,
      gender: DataTypes.STRING,
      status: DataTypes.STRING,
      staff: DataTypes.BOOLEAN,
      role: DataTypes.STRING,
      email_verified: DataTypes.BOOLEAN,
      phone_verified: DataTypes.BOOLEAN,
      otp_email: DataTypes.STRING,
      otp_phone: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
