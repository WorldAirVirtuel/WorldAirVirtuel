document.getElementById('search-depart').addEventListener('input', filterFlights);
document.getElementById('search-arrivee').addEventListener('input', filterFlights);
document.getElementById('hub-select').addEventListener('change', filterFlights);

function filterFlights() {
    const searchDepart = document.getElementById('search-depart').value.toLowerCase();
    const searchArrivee = document.getElementById('search-arrivee').value.toLowerCase();
    const selectedHub = document.getElementById('hub-select').value.toLowerCase();
    const flights = document.querySelectorAll('.flight-card');

    flights.forEach(flight => {
        const dep = flight.querySelector('h3.dep') ? flight.querySelector('h3.dep').innerText.toLowerCase() : '';
        const arr = flight.querySelector('h3.arr') ? flight.querySelector('h3.arr').innerText.toLowerCase() : '';

        const matchesDepart = dep.includes(searchDepart);
        const matchesArrivee = arr.includes(searchArrivee);
        const matchesHub = selectedHub ? dep.includes(selectedHub) : true;

        if (matchesDepart && matchesArrivee && matchesHub) {
            flight.style.display = 'block';
        } else {
            flight.style.display = 'none';
        }
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll('.counter-value');

    counters.forEach(counter => {
        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 200;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCounter, 10);
            } else {
                counter.innerText = target;
            }
        };

        updateCounter();
    });
});




