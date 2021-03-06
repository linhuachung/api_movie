"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Showtime, {
        foreignKey: "showtimeId",
      });
      this.belongsTo(models.Ticket, {
        foreignKey: "ticketId",
      });
    }
  }
  Seat.init(
    {
      name: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      price: DataTypes.INTEGER,
      type: DataTypes.STRING,
      showtimeId: DataTypes.INTEGER,
      ticketId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Seat",
    }
  );
  return Seat;
};
