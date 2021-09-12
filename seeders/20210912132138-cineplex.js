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
        logo: "./public/images/LogoCineplex/BHD.png",
        background: "",
        createdAt: "2021-09-12 00:00:00",
        updatedAt: "2021-09-12 00:00:00",
      },
      {
        name: "CGV",
        logo: "./public/images/LogoCineplex/CGV.png",
        background: "",
        createdAt: "2021-09-12 00:00:00",
        updatedAt: "2021-09-12 00:00:00",
      },
      {
        name: "Galaxy Cinema",
        logo: "./public/images/LogoCineplex/GalaxyCinema.png",
        background: "",
        createdAt: "2021-09-12 00:00:00",
        updatedAt: "2021-09-12 00:00:00",
      },
      {
        name: "Lotte Cinema",
        logo: "./public/images/LogoCineplex/lotteCinema.png",
        background: "",
        createdAt: "2021-09-12 00:00:00",
        updatedAt: "2021-09-12 00:00:00",
      },
      {
        name: "CineStar",
        logo: "./public/images/LogoCineplex/CineStart.png",
        background: "",
        createdAt: "2021-09-12 00:00:00",
        updatedAt: "2021-09-12 00:00:00",
      },
      {
        name: "Mega GS",
        logo: "./public/images/LogoCineplex/megags.png",
        background: "",
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
