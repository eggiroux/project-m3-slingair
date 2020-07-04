const flightInput = document.getElementById("flight");
const seatsDiv = document.getElementById("seats-section");
const confirmButton = document.getElementById("confirm-button");

let selection = "";

//get all flights numbers and add them to the selector
const populateFlights = async () => {
  const response = await fetch("/flightList");
  const allFlights = await response.json();

  allFlights.forEach((number) => {
    thisFlight = document.createElement("option");
    thisFlight.innerText = number;
    flightInput.appendChild(thisFlight);
  });
};

populateFlights();

const renderSeats = (seatData) => {
  document.querySelector(".form-container").style.display = "block";
  //clear the existing seats if the flight is changed
  let seatsDivChildren = seatsDiv.children;
  while (seatsDivChildren.length > 0) {
    //console.log("removing: ", seatsDivChildren[0]);
    seatsDiv.removeChild(seatsDivChildren[0]);
  }

  const alpha = ["A", "B", "C", "D", "E", "F"];
  for (let r = 1; r < 11; r++) {
    const row = document.createElement("ol");
    row.classList.add("row");
    row.classList.add("fuselage");
    seatsDiv.appendChild(row);
    for (let s = 1; s < 7; s++) {
      const seatNumber = `${r}${alpha[s - 1]}`;
      const seat = document.createElement("li");

      let seatStatus = seatData.find((seat) => seat.id === seatNumber);

      // Two types of seats to render
      const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`;
      const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`;

      if (seatStatus.isAvailable) {
        seat.innerHTML = seatAvailable;
      } else {
        seat.innerHTML = seatOccupied;
      }

      row.appendChild(seat);
    }
  }

  let seatMap = document.forms["seats"].elements["seat"];
  seatMap.forEach((seat) => {
    seat.onclick = () => {
      selection = seat.value;
      seatMap.forEach((x) => {
        if (x.value !== seat.value) {
          document.getElementById(x.value).classList.remove("selected");
        }
      });
      document.getElementById(seat.value).classList.add("selected");
      document.getElementById("seat-number").innerText = ` (${selection})`;
      confirmButton.disabled = false;
    };
  });
};

const toggleFormContent = async (event) => {
  const flightNumber = flightInput.value;
  //console.log("toggleFormContent: ", flightNumber);
  const response = await fetch(`/flights/${flightNumber}`);
  const seatData = await response.json();
  renderSeats(seatData);
};

const handleConfirmSeat = async (event) => {
  event.preventDefault();

  const response = await fetch("/users", {
    method: "POST",
    body: JSON.stringify({
      givenName: document.getElementById("givenName").value,
      surname: document.getElementById("surname").value,
      email: document.getElementById("email").value,
      flight: flightInput.value,
      seat: selection,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.status === "success") {
    window.location = `./confirmed.html?reservationID=${data.id}`;
  }
};

flightInput.addEventListener("change", toggleFormContent);
