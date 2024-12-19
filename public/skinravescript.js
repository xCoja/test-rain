document.addEventListener("DOMContentLoaded", () => {
    // The API URL you provided
    const apiUrl = "https://api.skinrave.gg/affiliates/applicants?skip=0&take=25&sort=wagered&order=DESC&userId=95902&from=2024-11-09T14:00:00Z&to=2024-11-23T14:00:00Z";

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const leaderboard = data.results; // Adjust if the structure of the API response differs.

            // Limit to top 10 users
            const topTen = leaderboard.slice(0, 10);

            // Select DOM elements for top 3 and the rest
            const topThreeSection = document.querySelector(".top-three");
            const leaderboardBody = document.querySelector(".leaderboard-body");

            // Clear existing content
            topThreeSection.innerHTML = "";
            leaderboardBody.innerHTML = "";

            // Top 3 Users
            const topThreeUsers = topTen.slice(0, 3);
            const displayOrder = [1, 0, 2]; // 2nd user in the middle, 1st on the left, 3rd on the right

            displayOrder.forEach((rankIndex, displayIndex) => {
                const user = topThreeUsers[rankIndex];
                if (user) {
                    const card = document.createElement("div");
                    card.className = `card ${displayIndex === 1 ? "second-card" : displayIndex === 0 ? "first-card" : "third-card"}`;

                    card.innerHTML = `
                        <div class="card-header">
                            <span class="badge ${rankIndex === 0 ? "badge-second" : rankIndex === 1 ? "badge-first" : "badge-third"}">
                                ${rankIndex === 0 ? "2nd" : rankIndex === 1 ? "1st" : "3rd"}
                            </span>
                            <div class="avatar-container">
                                <img src="${user.avatarUrl || 'default-avatar.png'}" alt="${user.username}">
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="leader-name">${user.username}</div>
                            <div class="leader-wagered">WAGERED:</div>
                            <div class="leader-amount">${user.wagered}</div>
                        </div>
                    `;
                    topThreeSection.appendChild(card);
                }
            });

            // Users from 4th to 10th
            topTen.slice(3).forEach((user, index) => {
                const row = document.createElement("div");
                row.className = "leaderboard-row";

                row.innerHTML = `
                    <div class="cell rank-cell">
                        <span class="rank">#${index + 4}</span>
                        <img src="${user.avatarUrl || 'default-avatar.png'}" class="avatar-img" alt="${user.username}">
                        <span class="name">${user.username}</span>
                    </div>
                    <div class="cell">
                        <div class="wagered">${user.wagered}</div>
                    </div>
                `;
                leaderboardBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error fetching leaderboard data:", error);
        });
});
