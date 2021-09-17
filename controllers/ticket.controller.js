const { Showtime, Cinema, Movie, Seat, Ticket } = require("../models");

const getShowTimeList = (showTimeId) => {
  return Showtime.findByPk(showTimeId, {
    include: [{ model: Movie }, { model: Cinema }, { model: Seat }],
  });
};

const createShowTimeController = (data) => {
  return Showtime.create(data);
};

const createSeatForShowTime = (data) => {
  return Seat.bulkCreate(data);
};

const booking = (data) => {
  return Ticket.bulkCreate(data);
};
const updateSeat = (dataUpdate, seatId) => {
  console.log("dataUpdate: ", dataUpdate);
  console.log("seatId: ", seatId);
  return Seat.update(dataUpdate, {
    where: {
      id: seatId,
    },
  });
};
module.exports = {
  createShowTimeController,
  createSeatForShowTime,
  getShowTimeList,
  booking,
  updateSeat,
};
