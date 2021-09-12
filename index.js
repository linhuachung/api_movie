const express = require("express");
const { rootRouter } = require("./routers/root.routers");
const path = require("path");

const env = process.env.NODE_ENV;
const config = require("./config/config.json")[env || "development"];
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Movie Api");
});
const pathPublicDirectory = path.join(__dirname, "./public");
app.use("/public", express.static(pathPublicDirectory));

app.use("/api", rootRouter);

app.listen(config.serverPort, () => {
  console.log(`App running on port ${config.serverPort}`);
});
