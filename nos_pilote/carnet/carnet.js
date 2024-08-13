document.addEventListener('DOMContentLoaded', function () {
    fetch('https://connect.flylat.net/api/flights/PMg6MNZ4VHbhBYTySj')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#flight-table tbody');
            data.forEach(flight => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${flight.username}</td>
                    <td>${flight.depicao}</td>
                    <td>${flight.desicao}</td>
                    <td>${flight.aircraft}</td>
                    <td>${flight.flight_num}</td>
                    <td>${flight.fpm}</td>
                    <td>${flight.profit}</td>
                    <td>${flight.date}</td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    // Fonction de filtrage
    const searchPilotInput = document.getElementById('search-pilot');
    searchPilotInput.addEventListener('input', function () {
        const filter = searchPilotInput.value.toLowerCase();
        const rows = document.querySelectorAll('#flight-table tbody tr');

        rows.forEach(row => {
            const pilotName = row.cells[0].textContent.toLowerCase();
            if (pilotName.includes(filter)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});
