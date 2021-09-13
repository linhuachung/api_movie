const { Cinema, Cineplex, sequelize, Cinebox } = require("../models");
const getCinemaList = () => {
  return Cinema.findAll();
};
const getInfoCinemaById = (id) => {
  return Cinema.findByPk(id, {
    include: [{ model: Cineplex }, { model: Cinebox }],
  });
};
const getInfoCinemaBySearch = (name) => {
  return sequelize.query(`SELECT * FROM cinemas  WHERE name LIKE "%${name}%"`);
};
const getInfoCineplex = () => {
  return Cineplex.findAll({
    include: [{ model: Cinema }],
  });
};
const getInfoCineplexById = (id) => {
  return Cineplex.findByPk(id, {
    include: [{ model: Cinema }],
  });
};

module.exports = {
  getCinemaList,
  getInfoCinemaById,
  getInfoCinemaBySearch,
  getInfoCineplex,
  getInfoCineplexById,
};
