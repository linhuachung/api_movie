"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Ticket, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      userName: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      avatar: DataTypes.STRING(1000),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
