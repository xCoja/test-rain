document.addEventListener("DOMContentLoaded", () => {
    fetch('https://api-jonji.jcy.gg/leaderboard-skinrave')
        .then(response => response.json())
        .then(data => {
            let leaderboard = data.results || [];

            // Sort as before
            leaderboard.sort((a, b) => {
                if (b.wagered !== a.wagered) {
                    return b.wagered - a.wagered;
                }
                return a.acquireTime - b.acquireTime;
            });

            leaderboard = leaderboard.slice(0, 10);

            const prizeMap = {
                0: 1000, 1: 500, 2: 200,
                3: 125, 4: 75, 5: 20,
                6: 20, 7: 20, 8: 20, 9: 20
            };

            leaderboard.forEach((user, index) => {
                user.prize = prizeMap[index] || 0;
            });

            const topThreeSection = document.querySelector(".top-three");
            const leaderboardBody = document.querySelector(".leaderboard-body");

            topThreeSection.innerHTML = "";
            leaderboardBody.innerHTML = "";

            const topThreeUsers = leaderboard.slice(0, 3);
            const displayOrder = [1, 0, 2];

            function formatUsername(name) {
                let safeName = name;
                if (name.startsWith("<")) {
                    safeName = "&lt;" + name.slice(1, 3);
                } else {
                    safeName = name.slice(0, 3);
                }
                return safeName + "****";
            }

            displayOrder.forEach((rankIndex) => {
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

                    // <-- Only here we add commas via locale formatting
                    const parts = user.wagered.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }).split('.');
                    const intPart = parts[0];
                    const decPart = parts[1];

                    const formattedName = formatUsername(user.name);

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
                            <div class="leader-name">${formattedName}</div>
                            <div class="leader-wagered">WAGERED:</div>
                            <div class="leader-amount">
                              <img src="logo-value.svg" style="max-width: 20px; vertical-align: middle; margin-bottom: 2px; margin-right: -3px;">
                               ${intPart}<span style="opacity: .5; margin-right: 15px;">.${decPart}</span>
                                </div>

                            <div class="leader-points">
                                <img src="logo-value.svg" style="max-width: 20px; vertical-align: middle; margin-bottom: 3px; margin-right: -3px;" />
                                <span style="margin-right: 25px">${user.prize}</span>
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

                    const formattedWageredRow = user.wagered >= 1000
                        ? user.wagered.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        : user.wagered.toFixed(2);

                    const formattedNameRow = formatUsername(user.name);

                    row.innerHTML = `
                        <div class="cell rank-cell">
                            <span class="rank">#${rank}</span>
                            <img src="${user.avatar}" class="avatar" alt="${user.name}'s avatar" />
                            <span class="name">${formattedNameRow}</span>
                        </div>
                        <div class="cell">
                            <div class="wagered">
                                <img src="logo-value.svg" style="max-width:17px" />
                                ${formattedWageredRow.split('.')[0]}<span style="opacity: .5;">.${formattedWageredRow.split('.')[1]}</span>
                            </div>
                        </div>
                        <div class="cell">
                            <div class="prize">
                                <img src="logo-value.svg" style="max-width:20px" />
                                ${user.prize}
                            </div>
                        </div>
                    `;

                    leaderboardBody.appendChild(row);
                }
            });
        })
        .catch(error => console.error("Error fetching leaderboard data:", error));
});
