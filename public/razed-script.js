document.addEventListener("DOMContentLoaded", () => {
    fetch('https://api-jonji.jcy.gg/leaderboard-csgo')
        .then(response => response.json())
        .then(data => {
            handleLeaderboard(data.results || []);
        })
        .catch(error => {
            console.error("Error fetching leaderboard data:", error);
            // Call with empty array so filler users still display
            handleLeaderboard([]);
        });
});

function handleLeaderboard(leaderboard) {
    leaderboard.forEach(user => {
        user.wagered = parseFloat(user.wagered) || 0;
    });

    leaderboard.sort((a, b) => {
        if (b.wagered !== a.wagered) {
            return b.wagered - a.wagered;
        }
        return a.acquireTime - b.acquireTime;
    });

    // Add filler users if less than 10
    const fillerCount = 10 - leaderboard.length;
    for (let i = 0; i < fillerCount; i++) {
        leaderboard.push({
            name: "_",
            avatar: "questionmark.jpg",
            wagered: 0,
            prize: 0,
            acquireTime: Date.now() + i
        });
    }

    // Trim to top 10 and assign prizes
    leaderboard = leaderboard.slice(0, 10);
    const prizeMap = [325, 175, 125, 75, 50, 0, 0, 0, 0, 0];
    leaderboard.forEach((user, index) => {
        user.prize = prizeMap[index];
    });

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

            const formattedWagered = user.wagered >= 1000 
                ? user.wagered.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                : user.wagered.toFixed(2);

            const formattedName = user.name.length > 3
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
                    <div class="leader-name">${formattedName}</div>
                    <div class="leader-wagered">WAGERED:</div>
                   <div class="leader-amount">
                    <img src="logo-value.png" style="max-width: 25px; vertical-align: middle; margin-bottom: 2px;margin-right: -7px;">
                    ${Number(user.wagered).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).split('.')[0]}<span style="opacity: .5; margin-right: 15px;">.${Number(user.wagered).toLocaleString('en-US', { minimumFractionDigits: 2 }).split('.')[1]}</span>
                   </div>

                    <div class="leader-points">
                        <img src="logo-value.png" style="max-width: 25px;  vertical-align: middle; margin-bottom: 5px; margin-right: -10px;" />
                        <span style="margin-right: 25px">${user.prize}</span>
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

            const formattedNameRow = user.name.length > 3
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
                        <img src="logo-value.png" style="max-width:25px;margin-right: -3px;" />
                        ${formattedWageredRow.split('.')[0]}<span style="opacity: .5;">.${formattedWageredRow.split('.')[1]}</span>
                    </div>
                </div>
                <div class="cell">
                    <div class="prize">
                        <img src="logo-value.png" style="max-width:25px;margin-right: -3px;" />
                        ${user.prize}
                    </div>
                </div>
            `;

            leaderboardBody.appendChild(row);
        }
    });
}
