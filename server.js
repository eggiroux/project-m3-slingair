"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const {
  handleFlightData,
  handleFlightList,
  handleAddUser,
  handleReservationInfo,
} = require("./serverHandlers");

const PORT = process.env.PORT || 8000;

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("dev"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints
  .get("/flightList", handleFlightList)
  .get("/flights/:flightNumber", handleFlightData)
  .get("/reservations/:id", handleReservationInfo)
  //.get('users/', findUsers)
  .post("/users", handleAddUser)

  .use((req, res) => res.send("Not Found"))
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
