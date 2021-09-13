const express = require("express");
const { RESPONSE_CODE } = require("../constants");
const {
  getCinemaList,
  getInfoCineplex,
  getInfoCineplexById,
  getInfoCinemaById,
  getInfoCinemaBySearch,
} = require("../controllers/cinema.controllers");

const cinemaRouter = express.Router();

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

module.exports = {
  cinemaRouter,
};
