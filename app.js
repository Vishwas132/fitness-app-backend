"use strict";
require('dotenv').config();
const config = require("./config");
const express = require("express");
const {json, urlencoded} = express;
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const models = require("./models");
const migrations = require("./migrations.js");
const routes = require("./routes");
const app = express();

app.use(cors());
app.use(helmet()); // Security middleware
app.use(json());
app.use(urlencoded({extended: false}));
app.use(cookieParser());

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
});

app.use("/", limiter, routes);

const PORT = config.port;

const startServer = async () => {
  try {
    await models.sequelize.authenticate();
    await migrations();

    app.listen(PORT);
    console.log(`App listening on port ${PORT} ----------`);
  } catch (error) {
    console.log(error);
  }
};

startServer();

module.exports = app;
