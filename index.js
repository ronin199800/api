require("express-async-errors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const debug = require("debug")("app:main");
const config = require("config");
const router = require("./src/routes");
const morgan = require("morgan");
const winston = require("winston");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}
const cors = require('cors');
app.use(cors());

mongoose
  .connect(config.get("db.address"))
  .then(() => debug("conected to mongoDB !"))
  .catch((err) => debug("could not conect to mongoDB"));

winston.add(new winston.transports.File({ filename: "logfile.log" }));
app.use("/api", router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`app listening on port ${port}`));
