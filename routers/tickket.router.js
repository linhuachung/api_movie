const express = require("express");
const { RESPONSE_CODE } = require("../constants");
const {
  createShowTimeController,
  getShowTimeList,
  createSeatForShowTime,
  booking,
  updateSeat,
} = require("../controllers/ticket.controller");
const {
  authorize,
  authenticate,
} = require("../middlewares/veryfy-token.middleware");
const { createDataSeat } = require("../utils/seatData");
const ticketRouters = express.Router();

// create showtime
ticketRouters.post("/createShowTime", async (req, res) => {
  try {
    const { startTime, cinemaId, movieId } = req.body;
    const dataShowTime = { startTime, cinemaId, movieId };
    const data = await createShowTimeController(dataShowTime);

    const seatData = createDataSeat(data.id);
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
    res.status(RESPONSE_CODE.OK).send(data);
  } catch (error) {
    console.log(error);
    res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
  }
});

// đặt vé

ticketRouters.post(
  "/booking",
  authenticate,
  authorize("KhachHang"),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { showtimeId, seatId } = req.body;
      const dataShowTime = { showtimeId };
      const dataBooking = [
        {
          userId: userId,
          showtimeId: +dataShowTime.showtimeId,
        },
      ];

      const data = await booking(dataBooking);
      const arrTicketId = data.map((item) => {
        return item.id;
      });
      const seatData = {
        status: true,
        ticketId: arrTicketId,
      };
      await updateSeat(seatData, +seatId);
      res.status(RESPONSE_CODE.OK).send([data, seatData]);
    } catch (error) {
      console.log(error);
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

module.exports = {
  ticketRouters,
};
