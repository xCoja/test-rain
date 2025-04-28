document.addEventListener("DOMContentLoaded", () => {
    fetch('https://api-jonji.jcy.gg/leaderboard-chicken')
        .then(response => response.json())
        .then(data => {
            let leaderboard = data.results || [];

            // Sort by xpEarned and acquireTime
            leaderboard.sort((a, b) => {
                if (b.xpEarned !== a.xpEarned) {
                    return b.xpEarned - a.xpEarned;
                }
                return a.acquireTime - b.acquireTime;
            });

            leaderboard = leaderboard.slice(0, 10);

            const topThreeSection = document.querySelector(".top-three");
            const leaderboardBody = document.querySelector(".leaderboard-body");

            leaderboardBody.innerHTML = "";
            topThreeSection.innerHTML = "";

            const topThreeUsers = leaderboard.slice(0, 3);
            const displayOrder = [1, 0, 2];

            displayOrder.forEach((rankIndex, displayIndex) => {
                const user = topThreeUsers[rankIndex];
                if (user) {
                    if (user.avatar === "/assets/img/censored_avatar.png") {
                        user.avatar = "https://csgobig.com/assets/img/censored_avatar.png";
                    }

                    const topUserCard = document.createElement("div");
                    const rank = rankIndex === 0 ? 2 : rankIndex === 1 ? 1 : 3;

                    topUserCard.classList.add(
                        "card",
                        rank === 1 ? "first-card" : rank === 2 ? "second-card" : "third-card"
                    );

                    let formattedName = user.name.length > 3
                        ? user.name.slice(0, 3) + "****"
                        : user.name.slice(0, 1) + "****";

                    topUserCard.innerHTML = `
                        <div class="card-header">
                            <span class="badge ${rank === 1 ? "badge-first" : rank === 2 ? "badge-second" : "badge-third"}">
                                ${rank === 1 ? "2nd" : rank === 2 ? "1st" : "3rd"}
                            </span>
                            <div class="avatar-container avatar-${rank}">
                                <img src="${user.avatar}" class="avatar" alt="${user.name}'s avatar" />
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="leader-name">
                                ${formattedName}
                            </div>
                            <div class="leader-wagered">XP EARNED:</div>
                            <div class="leader-amount">
                                <img src="" style="max-width: 20px; vertical-align: middle; margin-bottom: 2px; margin-right: -7px;">
                                ${Math.floor(user.xpEarned || 0)}
                            </div>
                            <div class="leader-points">
                                <img src="chicken-coin.png" style="max-width: 20px; vertical-align: middle; margin-bottom: 3px; margin-right: -5px;" />
                                <span style="margin-right: 25px">${user.prize || 0}</span>
                            </div>
                        </div>
                    `;

                    topThreeSection.appendChild(topUserCard);
                }
            });

            leaderboard.slice(3).forEach((user, index) => {
                if (user) {
                    if (user.avatar === "/assets/img/censored_avatar.png") {
                        user.avatar = "https://csgobig.com/assets/img/censored_avatar.png";
                    }

                    const row = document.createElement("div");
                    row.classList.add("leaderboard-row");

                    const rank = index + 4;

                    let formattedNameRow = user.name.length > 3
                        ? user.name.slice(0, 3) + "****"
                        : user.name.slice(0, 1) + "****";

                    row.innerHTML = `
                        <div class="cell rank-cell">
                            <span class="rank">#${rank}</span>
                            <img src="${user.avatar}" class="avatar" alt="${user.name}'s avatar" />
                            <span class="name">${formattedNameRow}</span>
                        </div>
                        <div class="cell">
                            <div class="wagered">
                                <img src="" style="max-width:17px" />
                                ${Math.floor(user.xpEarned || 0)}
                            </div>
                        </div>
                        <div class="cell">
                            <div class="prize">
                                <img src="chicken-coin.png" style="max-width:25px" />
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
