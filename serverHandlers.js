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

  let newReservation = {
    id: reservationId,
    flight: reservationData.flight,
    seat: reservationData.seat,
    givenName: reservationData.givenName,
    surname: reservationData.surname,
    email: reservationData.email,
  };
  reservations.push(newReservation);
  console.log(reservationId);
  res.status(200).send({ status: "success", id: reservationId });
};

module.exports = { handleFlightData, handleFlightList, handleAddUser };
