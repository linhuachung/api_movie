const express = require("express");
const movieRouters = express.Router();

movieRouters.get("/", (req, res) => {
  res.send("Movie Router");
});

module.exports = {
  movieRouters,
};
