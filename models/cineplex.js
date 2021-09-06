'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cineplex extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cineplex.init({
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    background: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cineplex',
  });
  return Cineplex;
};