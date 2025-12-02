
const USE_FILLERS = true;

document.addEventListener("DOMContentLoaded", () => {
    fetch('https://jonji-api.vercel.app/api/leaderboard/chips') 
        .then(response => response.json())
        .then(data => {
            let leaderboard = data.players || []; 

            // Sort the leaderboard by wagered amount and acquireTime
            leaderboard.sort((a, b) => {
                if (b.wagered !== a.wagered) {
                    return b.wagered - a.wagered; 
                }
                return a.acquireTime - b.acquireTime; 
            });

            // Limit to top 10 users
            leaderboard = leaderboard.slice(0, 10);

            
            if (USE_FILLERS) {
                leaderboard = leaderboard.map((user, index) => ({
                    ...user,
                    name: `_ ${index + 1}`,
                    avatar: "chips.png",
                    wagered: 0
                    
                }));
            }

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
                    
                    if (user.avatar === "/assets/img/censored_avatar.png") {
                        user.avatar = "https://csgobig.com/assets/img/censored_avatar.png";
                    }

                    if (user.avatar === "/chips.svg") {
                        user.avatar = "chips.png";
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
                                <img src="${user.avatar}" class="avatar" alt="${user.name}'s avatar" />
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="leader-name">
                                ${formattedName}
                            </div>
                            <div class="leader-wagered">WAGERED:</div>
                            <div class="leader-amount">
                                $
                                ${user.wagered ? Number(user.wagered).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).split('.')[0] : '0'}
                                <span style="opacity: .5; margin-right: 15px;">.${user.wagered ? Number(user.wagered).toLocaleString('en-US', { minimumFractionDigits: 2 }).split('.')[1] : '00'}</span>
                            </div>

                            <div class="leader-points">
                                $
                                <span style="margin-right: 25px">${user.prize || 0}</span>
                            </div>
                        </div>
                    `;
                    topThreeSection.appendChild(topUserCard);
                }
            });

            // For the rest (ranks 4-10)
            leaderboard.slice(3).forEach((user, index) => {
                if (user) {
                    
                    if (user.avatar === "/chips.svg") {
                        user.avatar = "chips.png"
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
                            <img src="${user.avatar}" class="avatar" alt="${user.name}'s avatar" />
                            <span class="name">${formattedNameRow}</span>
                        </div>
                        <div class="cell">
                            <div class="wagered">
                                <img src="shockcoin.png" style="max-width:17px" />
                                ${formattedWageredRow.split('.')[0]}<span style="opacity: .5;">.${formattedWageredRow.split('.')[1]}</span>
                            </div>
                        </div>
                        <div class="cell">
                            <div class="prize">
                                <img src="shockcoin.png" style="max-width:20px" />
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
