const express = require("express");
const { authRouter } = require("./auth.routers");
const { cinemaRouter } = require("./cinema.router");
const { movieRouters } = require("./movie.router");
const { ticketRouters } = require("./tickket.router");
const { userRouters } = require("./user.router");

const rootRouter = express.Router();
rootRouter.use("/user", userRouters);
rootRouter.use("/movie", movieRouters);
rootRouter.use("/author", authRouter);
rootRouter.use("/cinema", cinemaRouter);
rootRouter.use("/ticket", ticketRouters);

module.exports = {
  rootRouter,
};
