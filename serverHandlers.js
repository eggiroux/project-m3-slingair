const { flights } = require("./test-data/flightSeating");
const { reservations } = require("./test-data/reservations");
const { v4: uuidv4 } = require("uuid");

const handleFlightData = (req, res) => {
  const { flightNumber } = req.params;
  // get all flight numbers
  const allFlights = Object.keys(flights);
  // is flightNumber in the array?
  console.log("REAL FLIGHT: ", allFlights.includes(flightNumber));
  const selectedFlightSeating = flights[flightNumber];
  res.status(200).send(selectedFlightSeating);
};

const handleFlightList = (req, res) => {
  const allFlights = Object.keys(flights);
  console.log(allFlights);
  res.status(200).send(allFlights);
};

const handleAddUser = (req, res) => {
  const reservationData = req.body;
  const reservationId = uuidv4();

  console.log(flights[reservationData.flight]);

  let newReservation = {
    id: reservationId,
    flight: reservationData.flight,
    seat: reservationData.seat,
    givenName: reservationData.givenName,
    surname: reservationData.surname,
    email: reservationData.email,
  };
  reservations.push(newReservation);

  flights[reservationData.flight].forEach((item) => {
    if (item.id === reservationData.seat) {
      item.isAvailable = false;
    }
  });
  console.log(flights[reservationData.flight]);
  console.log(reservationId);
  res.status(200).send({ status: "success", id: reservationId });
};

const handleReservationInfo = (req, res) => {
  const identifier = req.params.identifier;
  let reservationObject = {};

  console.log(identifier);

  if (identifier.split("").includes("@")) {
    //find by email
    reservationObject = reservations.find((item) => item.email === identifier);
    if (!reservationObject) {
      res.status(404).send({ status: "error", error: "bad id" });
      return;
    }
    res.status(200).send(reservationObject);
    return;
  }

  //else find by id
  reservationObject = reservations.find((item) => item.id === identifier);

  if (!reservationObject) {
    res.status(404).send({ status: "error", error: "bad id" });
    return;
  }
  res.status(200).send(reservationObject);
};

module.exports = {
  handleFlightData,
  handleFlightList,
  handleAddUser,
  handleReservationInfo,
};
