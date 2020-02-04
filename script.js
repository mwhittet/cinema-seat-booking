const container = document.querySelector('#seats');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const filmSelect = document.getElementById('film');

let ticketPrice = +filmSelect.value;

// Save selected film index and price
const setFilmData = (filmIndex, filmPrice) => {
  localStorage.setItem('selectedFilmIndex', filmIndex);
  localStorage.setItem('selectedFilmPrice', filmPrice);
};

// Update total and count
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

// Get data from local storage and populate UI
const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  const selectedFilmIndex = localStorage.getItem('selectedFilmIndex');

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  if (selectedFilmIndex !== null) {
    filmSelect.selectedIndex = selectedFilmIndex;
  }
};

// Film select event
filmSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;

  setFilmData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Add event listener to container to track seat clicks
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// Initial setup
populateUI();
updateSelectedCount();
