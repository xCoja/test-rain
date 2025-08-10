document.addEventListener("DOMContentLoaded", () => {
    fetch('https://jonji-api.vercel.app/api/leaderboard/clashgg')
        .then(response => response.json())
        .then(data => {
            let leaderboard = data.players || [];

            leaderboard.sort((a, b) => {
                if (b.wagered !== a.wagered) {
                    return b.wagered - a.wagered;
                }
                return a.acquireTime - b.acquireTime;
            });

            leaderboard = leaderboard.slice(0, 15);

          

            const topThreeSection = document.querySelector(".top-three");
            const leaderboardBody = document.querySelector(".leaderboard-body");

            leaderboardBody.innerHTML = "";
            topThreeSection.innerHTML = "";

            const topThreeUsers = leaderboard.slice(0, 3);
            const displayOrder = [1, 0, 2];

            displayOrder.forEach((rankIndex, displayIndex) => {
                const user = topThreeUsers[rankIndex];
                if (user) {
                    if (
                        user.avatar === "/assets/img/censored_avatar.png" ||
                        user.avatar === "/assets/anonymous.webp" ||
                        user.avatar.includes("/assets/")
                    ) {
                        user.avatar = "avatar-anonymous.png";
                    }

                    const topUserCard = document.createElement("div");
                    const rank = rankIndex === 0 ? 2 : rankIndex === 1 ? 1 : 3;

                    topUserCard.classList.add(
                        "card",
                        rank === 1 ? "first-card" : rank === 2 ? "second-card" : "third-card"
                    );

                    const formattedWagered = user.wagered >= 1000
                        ? user.wagered.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        : user.wagered.toFixed(2);

                    let formattedName = user.name.length > 3
                        ? user.name.slice(0, 3) + "****"
                        : user.name.slice(0, 1) + "****";

                    topUserCard.innerHTML = `
                        <div class="card-header">
                            <span class="badge ${rank === 1 ? "badge-first" : rank === 2 ? "badge-second" : "badge-third"}">
                                ${rank === 1 ? "2nd" : rank === 2 ? "1st" : "3rd"}
                            </span>
                            <div class="avatar-container avatar-${rank}">
                                <img src="${user.avatar}" class="avatar" style="max-width: 96px;" alt="${user.name}'s avatar" />
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="leader-name">${formattedName}</div>
                            <div class="leader-wagered">WAGERED:</div>
                           <div class="leader-amount">
                             <img src="clashicon.png" style="max-width: 22px; vertical-align: middle; margin-bottom: 4px;margin-right: -3px;">
                             ${user.wagered ? Number(user.wagered).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).split('.')[0] : '0'}<span style="opacity: .5; margin-right: 15px;">.${user.wagered ? Number(user.wagered).toLocaleString('en-US', { minimumFractionDigits: 2 }).split('.')[1] : '00'}</span>
                          </div>


                            <div class="leader-points">
                                <img src="clashicon.png" style="max-width: 22px; vertical-align: middle; margin-bottom: 3px;margin-right: -5px;" />
                                <span style="margin-right: 25px">${user.prize}</span>
                            </div>
                        </div>
                    `;
                    topThreeSection.appendChild(topUserCard);
                }
            });

            leaderboard.slice(3).forEach((user, index) => {
                if (user) {
                    if (
                        user.avatar === "/assets/img/censored_avatar.png" ||
                        user.avatar === "/assets/anonymous.webp" ||
                        user.avatar.includes("/assets/")
                    ) {
                        user.avatar = "avatar-anonymous.png";
                    }

                    const row = document.createElement("div");
                    row.classList.add("leaderboard-row");

                    const rank = index + 4;

                    const formattedWageredRow = user.wagered >= 1000
                        ? user.wagered.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        : user.wagered.toFixed(2);

                    let formattedNameRow = user.name.length > 3
                        ? user.name.slice(0, 3) + "****"
                        : user.name.slice(0, 1) + "****";

                    row.innerHTML = `
                        <div class="cell rank-cell">
                            <span class="rank">#${rank}</span>
                            <img src="${user.avatar}" class="avatar" style="max-width: 50px;border-radius:32px;" alt="${user.name}'s avatar" />
                            <span class="name">${formattedNameRow}</span>
                        </div>
                        <div class="cell">
                            <div class="wagered">
                                <img src="clashicon.png" style="max-width:17px" />
                                ${formattedWageredRow.split('.')[0]}<span style="opacity: .5;">.${formattedWageredRow.split('.')[1]}</span>
                            </div>
                        </div>
                        <div class="cell">
                            <div class="prize">
                                <img src="clashicon.png" style="max-width:20px" />
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
