const flightElement = document.querySelector("#flight");
const seatElement = document.querySelector("#seat");
const nameElement = document.querySelector("#name");
const emailElement = document.querySelector("#email");
const emailInputElement = document.querySelector(".userEmailInput");
const submitButton = document.querySelector("#submitButton");
const reservationDataElement = document.getElementById("reservationData");

const reservationId = window.location.search.split("=")[1];

submitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const userEmail = emailInputElement.value;
  const response = await fetch(`/reservations/${userEmail}`);
  const data = await response.json();

  //console.log(data);

  flightElement.innerText = data.flight;
  seatElement.innerText = data.seat;
  nameElement.innerText = `${data.givenName} ${data.surname}`;
  emailElement.innerText = data.email;
  reservationDataElement.style.visibility = "visible";
});
