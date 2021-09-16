const express = require("express");
const { RESPONSE_CODE } = require("../constants");
const {
  getCinemaList,
  getInfoCineplex,
  getInfoCineplexById,
  getInfoCinemaById,
  getInfoCinemaBySearch,
  getMovieInCinemaById,
} = require("../controllers/cinema.controllers");

const cinemaRouter = express.Router();

/**
 * @swagger
 * tags:
 *  name: QuanLyRap
 * paths:
 *  /api/user/getCinemaList:
 *  get:
 *      tag: [MainData]
 *      parameters:
 *        -name: page_number
 *        default: 1
 *        in: query
 *        schema:
 *              type: integer
 *      responses:
 *            default:
 *                description: this is default
 */

cinemaRouter.get("/getCinemaList", async (req, res) => {
  try {
    const cinemaList = await getCinemaList();
    res.status(RESPONSE_CODE.OK).send(cinemaList);
  } catch (e) {
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(e);
  }
});
cinemaRouter.get("/getCinemaById=:id", async (req, res) => {
  try {
    const id = req.params.id;
    const cinema = await getInfoCinemaById(id);
    res.status(RESPONSE_CODE.OK).send(cinema);
  } catch (e) {
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(e);
  }
});
cinemaRouter.get("/getInfoCineplex", async (req, res) => {
  try {
    const cineplexList = await getInfoCineplex();
    res.status(RESPONSE_CODE.OK).send(cineplexList);
  } catch (e) {
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(e);
  }
});

cinemaRouter.get("/getInfoCineplexById=:id", async (req, res) => {
  try {
    const id = req.params.id;
    const cineplexList = await getInfoCineplexById(id);
    res.status(RESPONSE_CODE.OK).send(cineplexList);
  } catch (e) {
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(e);
  }
});
cinemaRouter.post("/searchCinema", async (req, res) => {
  try {
    const { searchData = "" } = req.query;
    const [cinema] = await getInfoCinemaBySearch(searchData);
    res.status(RESPONSE_CODE.OK).send(cinema);
  } catch (e) {
    console.log(e);
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(e);
  }
});

// Lấy danh sách phim từ rạp
cinemaRouter.get("/getMovieListFromCinema=:id", async (req, res) => {
  try {
    const cinemaId = req.params.id;
    const CinemaMovie = await getMovieInCinemaById(cinemaId);
    console.log(CinemaMovie);
    res.status(RESPONSE_CODE.OK).send({ movieList: CinemaMovie });
  } catch (e) {
    console.log(e);
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(e);
  }
});

module.exports = {
  cinemaRouter,
};
