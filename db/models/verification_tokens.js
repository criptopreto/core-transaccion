'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class verification_tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  verification_tokens.init({
    token: DataTypes.STRING,
    identifier: DataTypes.STRING,
    expires: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'verification_tokens',
  });
  return verification_tokens;
};