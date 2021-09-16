const { Movie } = require("../models");

const getListMovie = () => {
  return Movie.findAll();
};
const getMovieById = (id) => {
  return Movie.findByPk(id);
};
const createMovie = (dataMovie) => {
  return Movie.create(dataMovie);
};
const deleteMovie = (movieId) => {
  return Movie.destroy({
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

module.exports = {
  getListMovie,
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie,
};
