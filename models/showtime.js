"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Showtime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Cinema, {
        foreignKey: "cinemaId",
      });
      this.belongsTo(models.Movie, {
        foreignKey: "movieId",
      });
      this.hasMany(models.Seat, {
        foreignKey: "showtimeId",
      });
      this.hasMany(models.Ticket, {
        foreignKey: "showtimeId",
      });
    }
  }
  Showtime.init(
    {
      startTime: DataTypes.DATE,
      cinemaId: DataTypes.INTEGER,
      movieId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Showtime",
    }
  );
  return Showtime;
};
