document.addEventListener("DOMContentLoaded", () => {
    fetch('https://test-rain.onrender.com/leaderboard')  // Updated URL
        .then(response => response.json())
        .then(data => {
            let leaderboard = data.results;

            // Sort the leaderboard by wagered amount and acquireTime
            leaderboard.sort((a, b) => {
                if (b.wagered !== a.wagered) {
                    return b.wagered - a.wagered; // Sort by wagered amount
                }
                return a.acquireTime - b.acquireTime; // If wagered amounts are the same, sort by acquireTime
            });

            // Limit to top 10 users
            leaderboard = leaderboard.slice(0, 10);

            const topThreeSection = document.querySelector(".top-three");
            const leaderboardBody = document.querySelector(".leaderboard-body");

            // Clear previous content
            leaderboardBody.innerHTML = "";
            topThreeSection.innerHTML = "";

            // Top 3 users
            const topThreeUsers = leaderboard.slice(0, 3);

            // Display order for top 3
            const displayOrder = [1, 0, 2];

            displayOrder.forEach((rankIndex, displayIndex) => {
                const user = topThreeUsers[rankIndex];
                if (user) {
                    const topUserCard = document.createElement("div");

                    // Adding CSS classes based on rank
                    if (displayIndex === 0) {
                        topUserCard.classList.add("card", "first-card");
                    } else if (displayIndex === 1) {
                        topUserCard.classList.add("card", "second-card");
                    } else if (displayIndex === 2) {
                        topUserCard.classList.add("card", "third-card");
                    }

                    const rank = rankIndex === 0 ? 2 : rankIndex === 1 ? 1 : 3;

                    // Adjust avatar URL to full resolution or large if .png
                    let avatarUrl = user.avatar;
                    if (avatarUrl.endsWith('.jpg')) {
                        avatarUrl = avatarUrl.replace('.jpg', '_full.jpg');
                    } else if (avatarUrl.endsWith('_small.png')) {
                        avatarUrl = avatarUrl.replace('_small.png', '_large.png');
                    }

                    // Creating HTML for the cards
                    const username = user.username;
                    const abbreviatedName = username.length > 15 ? username.slice(0, 15) + '...' : username; // Show shortened name

                    topUserCard.innerHTML = `
                        <div class="card-header">
                            <span class="badge ${rank === 1 ? "badge-first" : rank === 2 ? "badge-second" : "badge-third"}">
                                ${rank === 1 ? "2nd" : rank === 2 ? "1st" : "3rd"}
                            </span>
                            <div class="avatar-container avatar-${rank === 1 ? "1st" : rank === 2 ? "2nd" : "3rd"}">
                                <img src="${avatarUrl}" alt="${user.username}">
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
                            <div class="leader-points"><img src="rain-coin.svg" style="max-width: 25px; vertical-align: middle; margin-bottom: 5px;">${rank === 1 ? 225 : rank === 2 ? 400 : 100}</div>
                        </div>
                    `;
                    topThreeSection.appendChild(topUserCard);
                }
            });

            // For the rest 7 users (rank 4-10)
            leaderboard.slice(3).forEach((user, index) => {
                if (user) {
                    const row = document.createElement("div");
                    row.classList.add("leaderboard-row");

                    const wageredParts = user.wagered ? user.wagered.toFixed(2).split('.') : ['0', '00'];
                    const rank = index + 4; // Ranks start at 4

                    // Adjust avatar URL to full resolution or large if .png
                    let avatarUrl = user.avatar;
                    if (avatarUrl.endsWith('.jpg')) {
                        avatarUrl = avatarUrl.replace('.jpg', '_full.jpg');
                    } else if (avatarUrl.endsWith('_small.png')) {
                        avatarUrl = avatarUrl.replace('_small.png', '_large.png');
                    }

                    // Set the prize based on rank
                    let prize = 0;
                    if (rank === 4) prize = 50;
                    else if (rank === 5) prize = 25;
                    else prize = 0; // For 6-10, prize is 0

                    row.innerHTML = `
                        <div class="cell rank-cell">
                            <span class="rank">#${rank}</span>
                            <img src="${avatarUrl}" class="avatar-img" alt="Avatar of ${user.username}">
                            <span class="name">${user.username}</span>
                        </div>
                        <div class="cell">
                            <div class="wagered">
                                <img src="rain-coin.svg" style="max-width:15px;margin-right: 5px">
                                ${wageredParts[0]}<span style="opacity: .5;">.${wageredParts[1]}</span>
                            </div>
                        </div>
                        <div class="cell">
                            <div class="prize"><img src="rain-coin.svg" style="max-width:20px;margin-right: 5px">${prize}</div>
                        </div>
                    `;

                    leaderboardBody.appendChild(row);
                }
            });
        })
        .catch(error => console.error("Error fetching leaderboard data:", error));
});
