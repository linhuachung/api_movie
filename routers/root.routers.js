const express = require("express");
const { authRouter } = require("./auth.routers");
const { movieRouters } = require("./movie.router");
const { userRouters } = require("./user.router");

const rootRouter = express.Router();
rootRouter.use("/user", userRouters);
rootRouter.use("/movie", movieRouters);
rootRouter.use("/author", authRouter);
module.exports = {
  rootRouter,
};
