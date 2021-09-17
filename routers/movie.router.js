const express = require("express");
const { RESPONSE_CODE } = require("../constants");
const {
  getListMovie,
  createMovie,
  deleteMovie,
  getMovieById,
  updateMovie,
} = require("../controllers/movie.controllers");
const {
  uploadBannerMovieMiddleWare,
} = require("../middlewares/upload-images.middlewares");
const { dateValidation } = require("../utils/validation");
const movieRouters = express.Router();

// Lấy danh sách phim
movieRouters.get("/getListMovie", async (req, res) => {
  try {
    const movieList = await getListMovie();
    res.status(RESPONSE_CODE.OK).send(movieList);
  } catch (error) {
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
  }
});

// Tìm phim theo id
movieRouters.get("/getMovieById=:id", async (req, res) => {
  try {
    const movieId = req.params.id;

    if (!movieId)
      return res.status(RESPONSE_CODE.BAD_REQUEST).send("invalid movie");

    const movie = await getMovieById(movieId);
    if (!movie)
      return res
        .status(RESPONSE_CODE.BAD_REQUEST)
        .send(`Movie ${movieId} is not exist`);

    res.send(movie).status(RESPONSE_CODE.OK);

    const movieList = await getListMovie();
    res.status(RESPONSE_CODE.OK).send(movieList);
  } catch (error) {
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
  }
});

// Tạo Phim
movieRouters.post(
  "/createMovie",
  uploadBannerMovieMiddleWare(),
  async (req, res) => {
    try {
      const { name, startDate, time, evaluate, poster, banner, trailer } =
        req.body;
      const { file } = req;

      const posterMovie = "http://localhost:3000/" + file.path;
      const bannerMovie = "http://localhost:3000/" + file.path;
      const dataMovie = {
        name,
        startDate,
        time,
        evaluate,
        poster: posterMovie,
        banner: bannerMovie,
        trailer,
      };
      // validation giá trị

      if (dataMovie.name.trim() === "")
        return res.status(400).send("Invalid movie name");
      if (!dateValidation.test(dataMovie.startDate))
        return res.status(400).send("Invalid startDate");
      if (/\D/.test(dataMovie.time))
        return res.status(400).send("Invalid time");
      if (/\D/.test(dataMovie.evaluate))
        return res.status(400).send("Invalid evaluate");
      if (dataMovie.poster.trim() === "")
        return res.status(400).send("Invalid poster");
      if (dataMovie.banner.trim() === "")
        return res.status(400).send("Invalid banner");
      if (dataMovie.trailer.trim() === "")
        return res.status(400).send("Invalid trailer");

      const movieList = await createMovie(dataMovie);
      res.status(RESPONSE_CODE.OK).send({
        id: movieList.id,
        name: movieList.name,
        startDate: movieList.startDate,
        time: movieList.time,
        evaluate: movieList.evaluate,
        poster: movieList.poster,
        banner: movieList.banner,
        trailer: movieList.trailer,
      });
    } catch (error) {
      console.log(error);
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

// Xóa phim
movieRouters.delete("/deleteMovie/:id", async (req, res) => {
  try {
    const movieId = +req.params.id;

    if (!movieId)
      return res.status(RESPONSE_CODE.BAD_REQUEST).send("invalid movie");

    const movie = await getMovieById(movieId);
    if (!movie)
      return res
        .status(RESPONSE_CODE.BAD_REQUEST)
        .send(`Movie ${movieId} is not exist`);

    await deleteMovie(movieId);

    res.send(`Movie id: ${movieId} has been delete`).status(RESPONSE_CODE.OK);
  } catch (error) {
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
  }
});

// Cập nhật phim
movieRouters.post(
  "/updateMove=:id",
  uploadBannerMovieMiddleWare(),
  async (req, res) => {
    try {
      const movieId = req.params.id;
      const { name, startDate, time, evaluate, poster, banner, trailer } =
        req.body;

      const { file } = req;

      const posterMovie = "http://localhost:3000/" + file.path;
      const bannerMovie = "http://localhost:3000/" + file.path;
      const dataMovie = {
        name,
        startDate,
        time,
        evaluate,
        poster: posterMovie,
        banner: bannerMovie,
        trailer,
      };

      if (!movieId)
        return res.status(RESPONSE_CODE.BAD_REQUEST).send("invalid movie");
      const movie = await getMovieById(movieId);
      if (!movie)
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send(`Movie ${movieId} is not exist`);

      // validation giá trị

      if (dataMovie.name.trim() === "")
        return res.status(400).send("Invalid movie name");
      // if (!dateValidation.test(dataMovie.startDate))
      //   return res.status(400).send("Invalid startDate");
      if (/\D/.test(dataMovie.time))
        return res.status(400).send("Invalid time");
      if (/\D/.test(dataMovie.evaluate))
        return res.status(400).send("Invalid evaluate");
      if (dataMovie.poster.trim() === "")
        return res.status(400).send("Invalid poster");
      if (dataMovie.banner.trim() === "")
        return res.status(400).send("Invalid banner");
      if (dataMovie.trailer.trim() === "")
        return res.status(400).send("Invalid trailer");

      await updateMovie(movieId, dataMovie);
      res.status(RESPONSE_CODE.OK).send("Movie has been Update:");
    } catch (error) {
      console.log(error);
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

module.exports = {
  movieRouters,
};
