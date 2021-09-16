const { Cinema, Cineplex, sequelize, Cinebox, Movie } = require("../models");
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
const getMovieInCinemaById = (id) => {
  return sequelize.query(`
  select movies.name as movieName , movies.startDate, movies.poster, movies.banner,movies.evaluate,movies.trailer from movies
  left join showtimes
  on movies.id = showtimes.movieId
  right join cinemas
  on cinemas.id = showtimes.cinemaId
  where cinemaId = ${id}
  `);
};

module.exports = {
  getCinemaList,
  getInfoCinemaById,
  getInfoCinemaBySearch,
  getInfoCineplex,
  getInfoCineplexById,
  getMovieInCinemaById,
};
