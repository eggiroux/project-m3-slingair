const flightElement = document.querySelector("#flight");
const seatElement = document.querySelector("#seat");
const nameElement = document.querySelector("#name");
const emailElement = document.querySelector("#email");

const url = new URL(window.location.href);
const params = url.searchParams;
const reservationId = params.get("reservationID");

const getReservationData = async () => {
  const response = await fetch(`/reservations/${reservationId}`);
  const data = await response.json();

  flightElement.innerText = data.flight;
  seatElement.innerText = data.seat;
  nameElement.innerText = `${data.givenName} ${data.surname}`;
  emailElement.innerText = data.email;
};

getReservationData();
