document.addEventListener("DOMContentLoaded", () => {
    fetch('https://api-jonji.jcy.gg/leaderboard-csgoroll')
        .then(response => response.json())
        .then(data => {
            let leaderboard = data.players || [];

            leaderboard.forEach(user => {
                user.deposited = parseFloat(user.deposited) || 0;
            });

            leaderboard.sort((a, b) => {
                if (b.deposited !== a.deposited) {
                    return b.deposited - a.deposited;
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
                    const topUserCard = document.createElement("div");

                    const rank = rankIndex === 0 ? 2 : rankIndex === 1 ? 1 : 3;

                    topUserCard.classList.add(
                        "card",
                        rank === 1 ? "first-card" : rank === 2 ? "second-card" : "third-card"
                    );

                    const formattedDeposited = user.deposited >= 1000 
                        ? user.deposited.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        : user.deposited.toFixed(2);

                    let formattedName = user.name.length > 3
                        ? user.name.slice(0, 3) + "****"
                        : user.name.slice(0, 1) + "****";

                    const avatarSrc = (user.avatar === '/csgold.png') ? 'csgold.png' : user.avatar;

                    topUserCard.innerHTML = `
                        <div class="card-header">
                            <span class="badge ${rank === 1 ? "badge-first" : rank === 2 ? "badge-second" : "badge-third"}">
                                ${rank === 1 ? "2nd" : rank === 2 ? "1st" : "3rd"}
                            </span>
                            <div class="avatar-container avatar-${rank}">
                                <img src="${avatarSrc}" class="avatar" alt="${user.name}'s avatar" />
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="leader-name">
                                ${formattedName}
                            </div>
                            <div class="leader-wagered">DEPOSITED:</div>
                            <div class="leader-amount">
                                <img src="rollcoin.png" style="max-width: 25px; vertical-align: middle; margin-bottom: 2px;margin-right: -3px; ">
                                ${user.deposited.toFixed(2).split('.')[0]}
                                <span style="opacity: .5; margin-right: 15px;">.${user.deposited.toFixed(2).split('.')[1]}</span>
                            </div>
                            <div class="leader-points">
                                <img src="rollcoin.png" style="max-width: 25px;  vertical-align: middle; margin-bottom: 5px; margin-right: -5px;" />
                                <span style="margin-right: 25px">${user.prize || 0}</span>
                            </div>
                        </div>
                    `;
                    topThreeSection.appendChild(topUserCard);
                }
            });

            leaderboard.slice(3).forEach((user, index) => {
                if (user) {
                    const row = document.createElement("div");
                    row.classList.add("leaderboard-row");

                    const rank = index + 4;

                    const formattedDepositedRow = user.deposited >= 1000
                        ? user.deposited.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        : user.deposited.toFixed(2);

                    let formattedNameRow = user.name.length > 3
                        ? user.name.slice(0, 3) + "****"
                        : user.name.slice(0, 1) + "****";

                    const avatarSrcRow = (user.avatar === '/csgold.png') ? 'csgold.png' : user.avatar;

                    row.innerHTML = `
                        <div class="cell rank-cell">
                            <span class="rank">#${rank}</span>
                            <img src="${avatarSrcRow}" class="avatar" alt="${user.name}'s avatar" />
                            <span class="name">${formattedNameRow}</span>
                        </div>
                        <div class="cell">
                            <div class="wagered">
                                <img src="rollcoin.png" style="max-width:25px;margin-right: 5px;" />
                                ${formattedDepositedRow.split('.')[0]}<span style="opacity: .5;">.${formattedDepositedRow.split('.')[1]}</span>
                            </div>
                        </div>
                        <div class="cell">
                            <div class="prize">
                                <img src="rollcoin.png" style="max-width:25px;margin-right: 5px;" />
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
