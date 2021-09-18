const { Movie, Showtime, Seat, sequelize } = require("../models");

const getListMovie = () => {
  return Movie.findAll();
};
const getMovieById = (id) => {
  return Movie.findByPk(id);
};
const createMovie = (dataMovie) => {
  return Movie.create(dataMovie);
};
const getShowtimeByMovie = (movieId) => {
  return Showtime.findAll({
    where: {
      movieId: movieId,
    },
  });
};
const deleteMovie = async (movieId) => {
  const showTimes = await getShowtimeByMovie(movieId);
  for (let i = 0; i < showTimes.length; i++) {
    Seat.destroy({
      where: {
        showtimeId: showTimes[i].id,
      },
    });
  }
  Showtime.destroy({
    where: {
      movieId: movieId,
    },
  });

  Movie.destroy({
    where: {
      id: movieId,
    },
  });
};

const updateMovie = (movieId, data) => {
  return Movie.update(data, {
    where: {
      id: movieId,
    },
  });
};

const searchMovie = (data) => {
  return sequelize.query(`
  SELECT * FROM movies  WHERE name LIKE "%${data}%"
  `);
};

module.exports = {
  getListMovie,
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie,
  searchMovie,
};
