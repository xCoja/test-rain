document.addEventListener("DOMContentLoaded", () => {
  fetch('https://jonji-api.vercel.app/api/leaderboard/csbattle')
    .then(response => response.json())
    .then(data => {
      // Normalize API → UI fields
      const raw = Array.isArray(data?.players) ? data.players : [];
      let leaderboard = raw.map(p => ({
        name: p?.username ?? "Anon",
        avatar: p?.profilePicture ?? "/assets/img/censored_avatar.png",
        wagered: Number(p?.wageredAmount ?? 0),
        
        apiReward: Number(p?.reward ?? 0),
        prize: 0,
        acquireTime: typeof p?.acquireTime === "number"
          ? p.acquireTime
          : (p?.acquireTime ? new Date(p.acquireTime).getTime() : 0)
      }));

      // Sort by wagered desc, then acquireTime asc
      leaderboard.sort((a, b) => {
        if (b.wagered !== a.wagered) return b.wagered - a.wagered;
        return a.acquireTime - b.acquireTime;
      });

      // Top 10
      leaderboard = leaderboard.slice(0, 10);

      
      const manualPrizes = [700, 350, 175, 100, 75, 20, 20, 20, 20, 20];
      leaderboard.forEach((u, i) => { u.prize = manualPrizes[i] ?? 0; });

      const topThreeSection = document.querySelector(".top-three");
      const leaderboardBody = document.querySelector(".leaderboard-body");
      leaderboardBody.innerHTML = "";
      topThreeSection.innerHTML = "";

      // Top 3 users, display order: 2nd, 1st, 3rd
      const topThreeUsers = leaderboard.slice(0, 3);
      const displayOrder = [1, 0, 2];

      displayOrder.forEach((rankIndex) => {
        const user = topThreeUsers[rankIndex];
        if (!user) return;

        // Avatar corrections
        if (user.avatar === "/assets/img/censored_avatar.png") {
          user.avatar = "https://csgobig.com/assets/img/censored_avatar.png";
        }
        if (user.avatar === "/shock.png") {
          user.avatar = "shock.png";
        }
        if (user.avatar === "/csbattle_coin.svg") {
          user.avatar = "questionmark.jpg";
        }

        const topUserCard = document.createElement("div");
        const rank = rankIndex === 0 ? 2 : rankIndex === 1 ? 1 : 3;
        topUserCard.classList.add(
          "card",
          rank === 1 ? "first-card" : rank === 2 ? "second-card" : "third-card"
        );

        const formattedWagered =
          user.wagered >= 1000
            ? user.wagered.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            : user.wagered.toFixed(2);

        const safeName = String(user.name ?? "Anon");
        const formattedName =
          safeName.length > 3 ? safeName.slice(0, 3) + "****" : safeName.slice(0, 1) + "****";

        topUserCard.innerHTML = `
          <div class="card-header">
            <span class="badge ${rank === 1 ? "badge-first" : rank === 2 ? "badge-second" : "badge-third"}">
              ${rank === 1 ? "2nd" : rank === 2 ? "1st" : "3rd"}
            </span>
            <div class="avatar-container avatar-${rank}">
              <img src="${user.avatar}" class="avatar" alt="${safeName}'s avatar" />
            </div>
          </div>
          <div class="card-body">
            <div class="leader-name">${formattedName}</div>
            <div class="leader-wagered">WAGERED:</div>
            <div class="leader-amount">
              <img src="csbattle-coin.svg" style="max-width: 19px; vertical-align: middle; margin-bottom: 2px; margin-right: -3px;">
              ${formattedWagered.split('.')[0]}
              <span style="opacity: .5; margin-right: 15px;">.${formattedWagered.split('.')[1]}</span>
            </div>
            <div class="leader-points">
              <img src="csbattle-coin.svg" style="max-width: 19px; vertical-align: middle; margin-bottom: 3px; margin-right: -3px;" />
              <span style="margin-right: 25px">${user.prize}</span>
            </div>
          </div>
        `;
        topThreeSection.appendChild(topUserCard);
      });

      // Ranks 4–10
      leaderboard.slice(3).forEach((user, index) => {
        if (!user) return;

        if (user.avatar === "/shock.png") user.avatar = "shock.png";
        if (user.avatar === "/csbattle_coin.svg") user.avatar = "questionmark.jpg";

        const row = document.createElement("div");
        row.classList.add("leaderboard-row");
        const rank = index + 4;

        const formattedWageredRow =
          user.wagered >= 1000
            ? user.wagered.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            : user.wagered.toFixed(2);

        const safeName = String(user.name ?? "Anon");
        const formattedNameRow =
          safeName.length > 3 ? safeName.slice(0, 3) + "****" : safeName.slice(0, 1) + "****";

        row.innerHTML = `
          <div class="cell rank-cell">
            <span class="rank">#${rank}</span>
            <img src="${user.avatar}" class="avatar" alt="${safeName}'s avatar" />
            <span class="name">${formattedNameRow}</span>
          </div>
          <div class="cell">
            <div class="wagered">
              <img src="csbattle-coin.svg" style="max-width:19px" />
              ${formattedWageredRow.split('.')[0]}<span style="opacity: .5;">.${formattedWageredRow.split('.')[1]}</span>
            </div>
          </div>
          <div class="cell">
            <div class="prize">
              <img src="csbattle-coin.svg" style="max-width:19px" />
              ${user.prize}
            </div>
          </div>
        `;
        leaderboardBody.appendChild(row);
      });
    })
    .catch(error => console.error("Error fetching leaderboard data:", error));
});

