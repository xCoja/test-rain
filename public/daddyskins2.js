document.addEventListener("DOMContentLoaded", () => {
    // Select the leaderboard component
    const leaderboard = document.querySelector("daddyskins-custom-leaderboard");

    if (leaderboard && leaderboard.shadowRoot) {
        // Create a new style element
        const style = document.createElement("style");
        style.textContent = `
            /* Apply Poppins font to the leaderboard */
            * {
                font-family: 'Poppins', sans-serif !important;
            }

            /* Apply custom styles to username */
            .leaderboard-preview-user__username {
                font-weight: bold !important;
                font-size: 16px !important;
                max-width: 200px;
                text-transform: capitalize !important; /* Capitalize first letter of each word */
            }

           
                 /* Custom color for rank position numbers */
            .leaderboard-preview:nth-child(1) .leaderboard-preview__position-content {
                color: gold !important; /* 1st place rank number */
            }
            .leaderboard-preview:nth-child(2) .leaderboard-preview__position-content {
                color: silver !important; /* 2nd place rank number */
            }
            .leaderboard-preview:nth-child(3) .leaderboard-preview__position-content {
                color: #cd7f32 !important; /* 3rd place rank number */
            }
            .leaderboard-preview:nth-child(n+4) .leaderboard-preview__position-content {
                color: white !important; /* Default rank number color for others */
            }

            
            /* Default color for other users */
            .leaderboard-preview:nth-child(n+4) .leaderboard-preview-user__username {
                color: white !important; /* Other users */
            }

            th.wagered {
              color : rgb(255, 88, 88);
            }
              th.user {
              color : rgb(255, 88, 88);
            }
            .leaderboard-preview-user-avatar__image {
                height: 100%;
                width: 100%;
            }
            .race-description-bg {
                display: none;
            }
            .leaderboard-race-details {
                display: none;
            }     
            .partner-leaderboard__load-more-button {
                 display: none;
            }
            span.title {
             font-size : 15px;
             font-weight : bold;
            }     
            .leaderboard-preview__wagered-value {
                color: rgb(255, 88, 88);
                text-shadow: 0 0 9px rgb(255, 88, 88);
                width: 150px;
                height: 35px;
                background: #101010;
                border-radius: 5px;
                font-weight: 600;
                font-size: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                }

                .leaderboard-preview {
                background-color: #181818 !important; 
                border: none;
                }

                
                daddyskins-custom-leaderboard {
                color: black; !important;}
`
        ;

        // Inject the style into the shadow DOM
        leaderboard.shadowRoot.appendChild(style);
    }
});