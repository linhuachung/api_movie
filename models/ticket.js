"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
      this.belongsTo(models.Showtime, {
        foreignKey: "showtimeId",
      });
    }
  }
  Ticket.init(
    {
      userId: DataTypes.INTEGER,
      showtimeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};
