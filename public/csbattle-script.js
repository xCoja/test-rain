
document.addEventListener("DOMContentLoaded", () => { 
    fetch('https://jonji-api.vercel.app/api/leaderboard/csgoroll')
        .then(response => response.json())
        .then(data => {
            let leaderboard = data.players || [];

            leaderboard.forEach(user => {
                user.wagered = parseFloat(user.wagered) || 0;
            });

            /* ---------------------- FILLERS (ADDED) ---------------------- */
            // Create a filler that always sorts after real users
            const makeFiller = () => ({
                name: "_",
                avatar: "questionmark.jpg",
                wagered: 0, // shows as 0.00 in your UI
                acquireTime: Number.MAX_SAFE_INTEGER
            });

            // Ensure there are 10 entries in total by padding with fillers
            if (leaderboard.length < 10) {
                const need = 10 - leaderboard.length;
                for (let i = 0; i < need; i++) {
                    leaderboard.push(makeFiller());
                }
            }
            /* -------------------- END FILLERS (ADDED) -------------------- */

            leaderboard.sort((a, b) => {
                if (b.wagered !== a.wagered) {
                    return b.wagered - a.wagered;
                }
                return a.acquireTime - b.acquireTime;
            });

            leaderboard = leaderboard.slice(0, 10);

            const topThreeSection = document.querySelector(".top-three");
            const leaderboardBody = document.querySelector(".leaderboard-body");

            leaderboardBody.innerHTML = "";
            topThreeSection.innerHTML = "";

            // 🔹 Manual prize mapping (added only this)
            const manualPrizes = {
                2: 700,
                1: 350,
                3: 175,
                4: 100,
                5: 75,
                6: 20,
                7: 20,
                8: 20,
                9: 20,
                10: 20
            };

            const topThreeUsers = leaderboard.slice(0, 3);
            const displayOrder = [1, 0, 2];

            displayOrder.forEach((rankIndex) => {
                const user = topThreeUsers[rankIndex];
                if (user) {
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

                    // Keep your existing mapping; fillers use questionmark.jpg directly
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
                            <div class="leader-wagered">WAGERED:</div>
                           <div class="leader-amount">
                           <img src="csbattle-coin.svg" style="max-width: 19px; vertical-align: middle; margin-bottom: 2px;margin-right: -2px;">
                          ${Number(user.wagered).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).split('.')[0]}<span style="opacity: .5; margin-right: 5px;">.${Number(user.wagered).toLocaleString('en-US', { minimumFractionDigits: 2 }).split('.')[1]}</span>
                          </div>

                            <div class="leader-points">
                                <img src="csbattle-coin.svg" style="max-width: 19px; vertical-align: middle; margin-bottom: 5px; margin-right: -5px;" />
                                <span style="margin-right: 13px">${manualPrizes[rank] || 0}</span>
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

                    const formattedWageredRow = user.wagered >= 1000
                        ? user.wagered.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        : user.wagered.toFixed(2);

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
                                <img src="csbattle-coin.svg" style="max-width:19px;margin-right: 5px;" />
                                ${formattedWageredRow.split('.')[0]}<span style="opacity: .5;">.${formattedWageredRow.split('.')[1]}</span>
                            </div>
                        </div>
                        <div class="cell">
                            <div class="prize">
                                <img src="csbattle-coin.svg" style="max-width:19px;margin-right: 5px;" />
                                ${manualPrizes[rank] || 0}
                            </div>
                        </div>
                    `;

                    leaderboardBody.appendChild(row);
                }
            });
        })
        .catch(error => console.error("Error fetching leaderboard data:", error));
});

