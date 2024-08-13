document.addEventListener('DOMContentLoaded', function () {
    fetch('https://connect.flylat.net/api/flights/PMg6MNZ4VHbhBYTySj')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#flight-table tbody');
            const pilotData = {};

            // Agrégation des données par pilote et identification du rang le plus élevé
            data.forEach(flight => {
                if (!pilotData[flight.username]) {
                    pilotData[flight.username] = {
                        flights: 0,
                        totalProfit: 0,
                        totalFpm: 0,
                        rank: flight.rank
                    };
                }
                pilotData[flight.username].flights += 1;
                pilotData[flight.username].totalProfit += parseFloat(flight.profit);
                pilotData[flight.username].totalFpm += parseFloat(flight.fpm);

                // Mise à jour du rang s'il est plus élevé
                if (parseInt(flight.rank) > parseInt(pilotData[flight.username].rank)) {
                    pilotData[flight.username].rank = flight.rank;
                }
            });

            // Mapping des noms d'utilisateurs aux noms d'affichage
            const displayNameMapping = {
                'julopar': 'jules P',
                'mathys_p': 'Mathys P', 
                'raphaelc': 'Raphael C', 
                'julien_m': 'Julien M', 
                'kader_s': 'Kader S', 
                'iss_f': 'Issa F',
                'adam_a':'Adam A',
                'baptistelazza':'Baptiste L',
                'AbdelBenselem ':'Abdel B',
                'Baptiste':'Baptiste C'
            };

            // Calcul de la moyenne de FPM et insertion dans le tableau
            Object.keys(pilotData).forEach(pilot => {
                const pilotInfo = pilotData[pilot];
                pilotInfo.averageFpm = (pilotInfo.totalFpm / pilotInfo.flights).toFixed(2);

                // Utiliser le nom d'affichage si disponible, sinon utiliser le nom d'utilisateur original
                let displayName = displayNameMapping[pilot] || pilot;
                let rank;
                if (pilot === 'julopar') {
                    rank = 'Capitaine, CEO de la compagnie';
                } else {
                    switch (parseInt(pilotInfo.rank)) {
                        case 0:
                            rank = 'Stagiaire Pilote';
                            break;
                        case 1:
                            rank = 'Second Officer';
                            break;
                        default:
                            rank = 'Rang Inconnu';
                    }
                }

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${displayName}</td>
                    <td>${rank}</td>
                    <td>${pilotInfo.flights}</td>
                    <td>${pilotInfo.totalProfit.toFixed(2)}$</td>
                    <td>${pilotInfo.averageFpm}</td>
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
