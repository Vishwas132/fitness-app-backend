"use strict";
require('dotenv').config();
const config = require("./config");
const express = require("express");
const {json, urlencoded} = express;
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(helmet()); // Security middleware
app.use(json());
app.use(urlencoded({extended: false}));
app.use(cookieParser());
const PORT = config.port;

const startServer = async () => {
  try {
    app.listen(PORT);
    console.log(`App listening on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
};

startServer();

module.exports = app;
