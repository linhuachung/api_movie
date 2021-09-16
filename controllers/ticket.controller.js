const { Showtime, Cinema, Movie, Seat } = require("../models");

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
module.exports = {
  createShowTimeController,
  createSeatForShowTime,
  getShowTimeList,
};
