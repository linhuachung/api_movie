"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("cineplexes", [
      {
        name: "BHD Star Cineplex",
        logo: "http://localhost:3000/public/images/LogoCineplex/BHD.png",
        createdAt: "2021-09-12 00:00:00",
        updatedAt: "2021-09-12 00:00:00",
      },
      {
        name: "CGV",
        logo: "http://localhost:3000/public/images/LogoCineplex/CGV.png",
        createdAt: "2021-09-12 00:00:00",
        updatedAt: "2021-09-12 00:00:00",
      },
      {
        name: "Galaxy Cinema",
        logo: "http://localhost:3000/public/images/LogoCineplex/GalaxyCinema.png",
        createdAt: "2021-09-12 00:00:00",
        updatedAt: "2021-09-12 00:00:00",
      },
      {
        name: "Lotte Cinema",
        logo: "http://localhost:3000/public/images/LogoCineplex/lotteCinema.png",
        createdAt: "2021-09-12 00:00:00",
        updatedAt: "2021-09-12 00:00:00",
      },
      {
        name: "CineStar",
        logo: "http://localhost:3000/public/images/LogoCineplex/CineStart.png",
        createdAt: "2021-09-12 00:00:00",
        updatedAt: "2021-09-12 00:00:00",
      },
      {
        name: "Mega GS",
        logo: "http://localhost:3000/public/images/LogoCineplex/megags.png",
        createdAt: "2021-09-12 00:00:00",
        updatedAt: "2021-09-12 00:00:00",
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
