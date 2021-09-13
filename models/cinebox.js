'use strict';
const {
  Model
} = require('sequelize');
const { cinemaData } = require("../utils/cinemaData");
module.exports = (sequelize, DataTypes) => {
  class cinebox extends Model {
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
    }
  };
  cinebox.init({
    boxName: DataTypes.STRING,
    cinemaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cinebox',
  });
  return cinebox;
};