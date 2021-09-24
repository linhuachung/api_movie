const express = require("express");
const { rootRouter } = require("./routers/root.routers");
const path = require("path");
const swaggerUi = require("swagger-ui-express");

const env = process.env.NODE_ENV;
const config = require("./config/config.json")[env || "development"];
const swaggerJSDoc = require("swagger-jsdoc");
const app = express();

app.use(express.json());
const pathPublicDirectory = path.join(__dirname, "./public");
app.use("/public", express.static(pathPublicDirectory));

const options = {
  swaggerDefinition: {
    swagger: "2.0",
    info: {
      title: "Movie Api",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {},
  },
  apis: ["./index.yaml"],
};

app.use("/api", rootRouter);
const swaggerSpecs = swaggerJSDoc(options);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(config.serverPort, () => {
  console.log(`App running on port ${config.serverPort}`);
});
