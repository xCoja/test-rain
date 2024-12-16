document.addEventListener("DOMContentLoaded", () => {
    fetch('https://test-rain.onrender.com/leaderboard')  // Ažurirani URL
        .then(response => response.json())
        .then(data => {
            let leaderboard = data.results;

            // Sortiranje leaderboard-a po wagered i acquireTime
            leaderboard.sort((a, b) => {
                if (b.wagered !== a.wagered) {
                    return b.wagered - a.wagered; // Sortiraj po wagered
                }
                return a.acquireTime - b.acquireTime; // Ako su isti wagered, sort po acquireTime
            });

            // Ograniči na top 10 korisnika
            leaderboard = leaderboard.slice(0, 10);

            const topThreeSection = document.querySelector(".top-three");
            const leaderboardBody = document.querySelector(".leaderboard-body");

            // Očisti prethodne podatke
            leaderboardBody.innerHTML = "";
            topThreeSection.innerHTML = "";

            // Prvih 3 korisnika (top 3)
            const topThreeUsers = leaderboard.slice(0, 3);

            // Redosled za prikaz: Rank 2, Rank 1, Rank 3
            const displayOrder = [1, 0, 2];

            displayOrder.forEach((rankIndex, displayIndex) => {
                const user = topThreeUsers[rankIndex];
                if (user) {
                    const topUserCard = document.createElement("div");

                    // Dodavanje CSS klase na osnovu ranga
                    if (displayIndex === 0) {
                        topUserCard.classList.add("card", "first-card");
                    } else if (displayIndex === 1) {
                        topUserCard.classList.add("card", "second-card");
                    } else if (displayIndex === 2) {
                        topUserCard.classList.add("card", "third-card");
                    }

                    const rank = rankIndex === 0 ? 2 : rankIndex === 1 ? 1 : 3;

                    // Kreiranje HTML za kartice
                    const username = user.username;
                    const abbreviatedName = username.length > 15 ? username.slice(0, 15) + '...' : username; // Prikazivanje skraćenog imena

                    topUserCard.innerHTML = `
                        <div class="card-header">
                            <span class="badge ${rank === 1 ? "badge-first" : rank === 2 ? "badge-second" : "badge-third"}">
                                ${rank === 1 ? "2nd" : rank === 2 ? "1st" : "3rd"}
                            </span>
                            <div class="avatar-container avatar-${rank === 1 ? "1st" : rank === 2 ? "2nd" : "3rd"}">
                                <img src="${user.avatar}" alt="${user.username}">
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="leader-name">
                                <abbr title="${user.username}">${abbreviatedName}</abbr>
                            </div>
                            <div class="leader-wagered">WAGERED:</div>
                            <div class="leader-amount">
                                <img src="rain-coin.svg" style="max-width: 25px; vertical-align: middle; margin-bottom: 2px;">
                                ${user.wagered ? user.wagered.toFixed(2).split('.')[0] : '0'}<span style="opacity: .5;">.${user.wagered ? user.wagered.toFixed(2).split('.')[1] : '00'}</span>
                            </div>
                            <div class="leader-points"><img src="rain-coin.svg" style="max-width: 25px; vertical-align: middle; margin-bottom: 5px;">${rank === 1 ? 400 : rank === 2 ? 200 : 100}</div>
                        </div>
                    `;
                    topThreeSection.appendChild(topUserCard);
                }
            });

            // Ostalih 7 korisnika (rank 4-10)
            leaderboard.slice(3).forEach((user, index) => {
                if (user) {
                    const row = document.createElement("div");
                    row.classList.add("leaderboard-row");

                    const wageredParts = user.wagered ? user.wagered.toFixed(2).split('.') : ['0', '00'];
                    const rank = index + 4; // Ranks start at 4

                    // Definiši red za korisnika
                    row.innerHTML = `
                        <div class="cell rank-cell">
                            <span class="rank">#${rank}</span>
                            <img src="${user.avatar}" class="avatar-img" alt="Avatar of ${user.username}">
                            <span class="name">${user.username}</span>
                        </div>
                        <div class="cell">
                            <div class="wagered">
                                <img src="chicken-coin.png" style="max-width:15px;margin-right: 5px">
                                ${wageredParts[0]}<span style="opacity: .5;">.${wageredParts[1]}</span>
                            </div>
                        </div>
                        <div class="cell">
                            <div class="prize"><img src="chicken-coin.png" style="max-width:20px;margin-right: 5px">5</div>
                        </div>
                    `;

                    leaderboardBody.appendChild(row);
                }
            });
        })
        .catch(error => console.error("Error fetching leaderboard data:", error));
});
