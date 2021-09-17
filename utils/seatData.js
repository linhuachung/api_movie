const createDataSeat = (showtimeId) => {
  let seatData = [];
  for (let i = 1; i < 161; i++) {
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
