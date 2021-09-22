const express = require("express");
const { RESPONSE_CODE } = require("../constants");
const {
  getListMovie,
  createMovie,
  deleteMovie,
  getMovieById,
  updateMovie,
  searchMovie,
} = require("../controllers/movie.controllers");
const {
  uploadImageMovieMiddleWare,
} = require("../middlewares/upload-images.middlewares");
const {
  authenticate,
  authorize,
} = require("../middlewares/veryfy-token.middleware");
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
      return res.status(RESPONSE_CODE.BAD_REQUEST).send("Phim không hợp lệ");

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
  authenticate,
  authorize("QuanTri"),
  uploadImageMovieMiddleWare(),
  async (req, res) => {
    try {
      const { name, startDate, time, evaluate, trailer } = req.body;
      let file = req.files;
      let posterImg = file.poster.map((item) => {
        return item.path;
      });
      let bannerImg = file.banner.map((item) => {
        return item.path;
      });
      const posterMovie = "http://localhost:3000/" + posterImg;
      const bannerMovie = "http://localhost:3000/" + bannerImg;
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
        return res.status(400).send("Tên phim không hợp lệ");
      if (!dateValidation.test(dataMovie.startDate))
        return res
          .status(400)
          .send("StartDate sai định dạng, định dạng hợp lệ: YYYY-MM-DD");
      if (/\D/.test(dataMovie.time))
        return res.status(400).send("Thời lượng phim không hợp lệ");
      if (/\D/.test(dataMovie.evaluate))
        return res.status(400).send("Đánh giá phim không hợp lệ");
      if (dataMovie.poster.trim() === "")
        return res.status(400).send("Poster phim sai định dạng");
      if (dataMovie.banner.trim() === "")
        return res.status(400).send("Banner phim sai định dạng");
      if (dataMovie.trailer.trim() === "")
        return res.status(400).send("Trailer phim không hợp lệ");

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
movieRouters.delete(
  "/deleteMovie/:id",
  authenticate,
  authorize("QuanTri"),
  async (req, res) => {
    try {
      const movieId = +req.params.id;

      if (!movieId)
        return res.status(RESPONSE_CODE.BAD_REQUEST).send("Phim không hợp lệ");

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
  }
);

// Cập nhật phim
movieRouters.post(
  "/updateMove=:id",
  authenticate,
  authorize("QuanTri"),
  uploadImageMovieMiddleWare(),
  async (req, res) => {
    try {
      const movieId = req.params.id;
      const { name, startDate, time, evaluate, trailer } = req.body;

      let file = req.files;
      let posterImg = file.poster.map((item) => {
        return item.path;
      });
      let bannerImg = file.banner.map((item) => {
        return item.path;
      });
      const posterMovie = "http://localhost:3000/" + posterImg;
      const bannerMovie = "http://localhost:3000/" + bannerImg;
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
        return res.status(RESPONSE_CODE.BAD_REQUEST).send("Phim không hợp lệ");
      const movie = await getMovieById(movieId);
      if (!movie)
        return res
          .status(RESPONSE_CODE.BAD_REQUEST)
          .send(`Movie ${movieId} is not exist`);

      // validation giá trị

      if (dataMovie.name.trim() === "")
        return res.status(400).send("Tên phim không hợp lệ");
      if (!dateValidation.test(dataMovie.startDate))
        return res.status(400).send("StartDate sai định dạng");
      if (/\D/.test(dataMovie.time))
        return res.status(400).send("Thời lượng phim không hợp lệ");
      if (/\D/.test(dataMovie.evaluate))
        return res.status(400).send("Đánh giá phim không hợp lệ");
      if (dataMovie.poster.trim() === "")
        return res.status(400).send("Poster phim sai định dạng");
      if (dataMovie.banner.trim() === "")
        return res.status(400).send("Banner phim sai định dạng");
      if (dataMovie.trailer.trim() === "")
        return res.status(400).send("Trailer phim không hợp lệ");

      await updateMovie(movieId, dataMovie);
      res.status(RESPONSE_CODE.OK).send("Cập nhật phim thành công");
    } catch (error) {
      console.log(error);
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

// Tìm phim theo name
movieRouters.post("/searchMovie", async (req, res) => {
  try {
    const { movieName = "" } = req.query;
    const [movie] = await searchMovie(movieName);
    res.send(movie).status(RESPONSE_CODE.OK);
  } catch (error) {
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
  }
});

// Phân Trang
movieRouters.get("/paginationMovieList", async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let result = {};
    const dataMovie = await getListMovie();

    if (endIndex < dataMovie.length) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    result = dataMovie.slice(startIndex, endIndex);
    res.send(result).status(RESPONSE_CODE.OK);
  } catch (err) {
    console.log(err);
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(err);
  }
});

module.exports = {
  movieRouters,
};
