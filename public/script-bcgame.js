document.addEventListener("DOMContentLoaded", () => {
    fetch('https://api-jonji.jcy.gg/leaderboard-bcgame') // Updated URL
        .then(response => response.json())
        .then(data => {
            let leaderboard = data.results || []; // Ensure data exists

            // Sort the leaderboard by wagered amount and acquireTime
            leaderboard.sort((a, b) => {
                if (b.wagered !== a.wagered) {
                    return b.wagered - a.wagered; // Sort by wagered amount
                }
                return a.acquireTime - b.acquireTime; // Secondary sort by acquireTime
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
            const displayOrder = [1, 0, 2]; // Adjust display order

            displayOrder.forEach((rankIndex, displayIndex) => {
                const user = topThreeUsers[rankIndex];
                if (user) {
                    const topUserCard = document.createElement("div");

                    // Adding CSS classes based on rank
                    const rank = rankIndex === 0 ? 2 : rankIndex === 1 ? 1 : 3;

                    topUserCard.classList.add(
                        "card",
                        rank === 1 ? "first-card" : rank === 2 ? "second-card" : "third-card"
                    );

                    // Format wagered amount with commas if greater than 1000
                    const formattedWagered = user.wagered >= 1000 
                        ? user.wagered.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        : user.wagered.toFixed(2);

                    // Determine name format based on length
                    let formattedName = user.name.length > 3
                        ? user.name.slice(0, 3) + "****"
                        : user.name.slice(0, 1) + "****";

                    topUserCard.innerHTML = `
                        <div class="card-header">
                            <span class="badge ${rank === 1 ? "badge-first" : rank === 2 ? "badge-second" : "badge-third"}">
                                ${rank === 1 ? "2nd" : rank === 2 ? "1st" : "3rd"}
                            </span>
                            <div class="avatar-container avatar-${rank}">
                                <img src="bc-avatar.png" class="avatar" alt="Default avatar" />
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="leader-name">
                                <abbr title="${user.name}">${formattedName}</abbr>
                            </div>
                            <div class="leader-wagered">WAGERED:</div>
                           <div class="leader-amount">
                               <span style="color: rgb(51, 247, 2);margin-right: -4px;">$</span>
                                ${user.wagered ? user.wagered.toFixed(2).split('.')[0] : '0'}<span style="opacity: .5; margin-right: 1px;">.${user.wagered ? user.wagered.toFixed(2).split('.')[1] : '00'}</span>
                            </div>
                            <div class="leader-points">
                               <span style="margin-right: -4px;">$</span>
                                <span style="margin-right: 8px">${user.prize || 0}</span>
                            </div>
                        </div>
                    `;
                    topThreeSection.appendChild(topUserCard);
                }
            });

            // For the rest (ranks 4-10)
            leaderboard.slice(3).forEach((user, index) => {
                if (user) {
                    const row = document.createElement("div");
                    row.classList.add("leaderboard-row");

                    const rank = index + 4;

                    // Format wagered amount with commas if greater than 1000
                    const formattedWageredRow = user.wagered >= 1000
                        ? user.wagered.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        : user.wagered.toFixed(2);

                    // Determine name format based on length for rows
                    let formattedNameRow = user.name.length > 3
                        ? user.name.slice(0, 3) + "****"
                        : user.name.slice(0, 1) + "****";

                    row.innerHTML = `
                        <div class="cell rank-cell">
                            <span class="rank">#${rank}</span>
                            <img src="bc-avatar.png" class="avatar" alt="Default avatar" />
                            <span class="name">${formattedNameRow}</span>
                        </div>
                        <div class="cell">
                            <div class="wagered">
                               
                           <span style="color: rgb(51, 247, 2);margin-right: 2px;">$</span>
                                ${formattedWageredRow.split('.')[0]}<span style="opacity: .5;">.${formattedWageredRow.split('.')[1]}</span>
                            </div>
                        </div>
                        <div class="cell">
                            <div class="prize">
                                 $
                                ${user.prize || 0}
                            </div>
                        </div>
                    `;

                    leaderboardBody.appendChild(row);
                }
            });
        })
        .catch(error => console.error("Error fetching leaderboard data:", error));
});
