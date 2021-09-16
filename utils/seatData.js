let seatData = [];
const createDataSeat = (showtimeId) => {
  for (let i = 1; i < 4; i++) {
    seatData.push({
      name: `${i}`,
      status: false,
      price: 75000,
      type: "Thuong",
      showtimeId: showtimeId,
    });
  }
  return seatData;
};
module.exports = {
  createDataSeat,
};
