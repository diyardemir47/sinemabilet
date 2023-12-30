const container = document.querySelector(".container");
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat');

getFromLocalStorage();
calculateTotal();

container.addEventListener("click", function (e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateTotal();
    }
});

select.addEventListener('change', function (e) {
    // When the movie is changed, clear all selected seats
    seats.forEach(seat => {
        if (seat.classList.contains('selected')) {
            seat.classList.remove('selected');
        }
    });
    calculateTotal();
});

function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected');
    const selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;

    let totalAmount = 0;

    selectedSeats.forEach(function (seat) {
        totalAmount += parseFloat(seat.getAttribute('data-price'));
    });

    amount.innerText = totalAmount;

    const selectedSeatIndexs = Array.from(selectedSeats).map(seat => Array.from(seats).indexOf(seat));

    saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
}

function saveToLocalStorage(indexs) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}
