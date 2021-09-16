const express = require("express");
const { RESPONSE_CODE } = require("../constants");
const {
  createShowTimeController,
  getShowTimeList,
  createSeatForShowTime,
} = require("../controllers/ticket.controller");
const { createDataSeat } = require("../utils/seatData");
const ticketRouters = express.Router();

// create showtime
ticketRouters.post("/createShowTime", async (req, res) => {
  try {
    const { startTime, cinemaId, movieId } = req.body;
    const dataShowTime = { startTime, cinemaId, movieId };
    const data = await createShowTimeController(dataShowTime);

    const seatData = createDataSeat(data.id);
    // const seatData = {
    //   name: `1`,
    //   status: false,
    //   price: 75000,
    //   type: "Thuong",
    //   showtimeId: `${data.id}`,
    // };

    const seatList = await createSeatForShowTime(seatData);

    res.status(RESPONSE_CODE.OK).send({ data, seatList });
    console.log(seatData.showtimeId);
  } catch (error) {
    console.log(error);
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
  }
});

// get showtime by Id

ticketRouters.get("/getShowTime=:id", async (req, res) => {
  try {
    const showTimeId = req.params.id;
    const data = await getShowTimeList(showTimeId);
    console.log(data);
    res.status(RESPONSE_CODE.OK).send(data);
  } catch (error) {
    console.log(error);
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
  }
});
module.exports = {
  ticketRouters,
};
