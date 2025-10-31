let currentEndTimeUTC = Date.UTC(2025, 10, 14, 0, 0, 0); 

let period = 14 * 24 * 60 * 60 * 1000; 

function countdown() {
    let now = Date.now();

    
    while (currentEndTimeUTC <= now) {
        currentEndTimeUTC += period;
    }

    const x = setInterval(() => {
        now = Date.now();
        let distance = currentEndTimeUTC - now;

        if (distance <= 0) {
            currentEndTimeUTC += period; 
            distance = currentEndTimeUTC - now;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

         document.getElementById("days").innerHTML = days;
         document.getElementById("hours").innerHTML = hours;
         document.getElementById("minutes").innerHTML = minutes;
         document.getElementById("seconds").innerHTML = seconds;
    }, 1000);
}

countdown();

function createBubbles() {
    const bubblesContainer = document.querySelector('.bubbles-container');
    const bubbleCount = 100;

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 3 + 3;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDelay = `${Math.random() * 15}s`;
        bubble.style.background = `rgb(255, 161, 66, ${Math.random() * 0.5 + 0.2})`;

        bubblesContainer.appendChild(bubble);
    }
}

// Show Winners Popup
const showWinnersButton = document.querySelector('.show-winners');
const popupOverlayWinners = document.getElementById('popup-overlay-winners');
const popupCloseWinners = document.getElementById('popup-close-winners');
const set1 = document.getElementById('set1');
const set2 = document.getElementById('set2');
const set3 = document.getElementById('set3')
const nav1 = document.getElementById('nav1');
const nav2 = document.getElementById('nav2');
const nav3 = document.getElementById('nav3')
const popupDate = document.getElementById('popup-date');  // Get the popup date element

showWinnersButton.addEventListener('click', (event) => {
    event.stopPropagation();
    popupOverlayWinners.style.display = 'flex';
    set1.style.display = 'none'; 
    set2.style.display = 'none'; 
    set3.style.display = 'block'
    nav1.classList.add('active'); 
    nav2.classList.remove('active');
    nav3.classList.remove('active')

});

popupCloseWinners.addEventListener('click', (event) => {
    event.stopPropagation();
    popupOverlayWinners.style.display = 'none';
});

popupOverlayWinners.addEventListener('click', (event) => {
    if (event.target === popupOverlayWinners) {
        popupOverlayWinners.style.display = 'none';
    }
});







const YOUTUBE_RSS_FEED = 'https://www.youtube.com/feeds/videos.xml?channel_id=UChMMQ09LtWh5n2w-LeSsxMQ'; 

const RSS2JSON_API_URL = 'https://api.rss2json.com/v1/api.json?rss_url=';

async function fetchYouTubeVideos() {
    const response = await fetch(`${RSS2JSON_API_URL}${encodeURIComponent(YOUTUBE_RSS_FEED)}`);
    const data = await response.json();
    displayYouTubeVideos(data.items.slice(0, 5));
}

function displayYouTubeVideos(videos) {
    const youtubeVideosContainer = document.getElementById('youtube-videos');
    youtubeVideosContainer.innerHTML = '';

    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'youtube-video-card';
        videoCard.innerHTML = `
            <a href="${video.link}" target="_blank">
                <img src="${video.thumbnail}" alt="${video.title}" class="youtube-video-thumbnail">
                <div class="youtube-video-title">${video.title}</div>
            </a>
        `;
        youtubeVideosContainer.appendChild(videoCard);
    });
}


window.onload = function() {
    countdown();
    fetchYouTubeVideos();
    createBubbles();

    // Participate Popup
    const participateButton = document.querySelector('.how-to-participate');
    const popupOverlay = document.getElementById('popup-overlay');
    const popupClose = document.getElementById('popup-close');

    participateButton.addEventListener('click', (event) => {
        event.stopPropagation();
        popupOverlay.style.display = 'flex';
    });

    popupClose.addEventListener('click', (event) => {
        event.stopPropagation();
        popupOverlay.style.display = 'none';
    });

    popupOverlay.addEventListener('click', (event) => {
        if (event.target === popupOverlay) {
            popupOverlay.style.display = 'none';
        }
    });

// Close the popup when the close button is clicked
popupCloseWinners.addEventListener('click', (event) => {
    event.stopPropagation();
    popupOverlayWinners.style.display = 'none';
});

// Close the popup when clicking outside the content area
popupOverlayWinners.addEventListener('click', (event) => {
    if (event.target === popupOverlayWinners) {
        popupOverlayWinners.style.display = 'none';
    }
});








const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!isOpen));
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    document.body.style.overflow = isOpen ? '' : 'hidden'; // sprečava pomeranje stranice na mobilu
  });

  // Zatvori meni kad klikneš link
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.setAttribute('data-open', 'false');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}








// Contact Popup
const contactButton = document.getElementById('contact-button');
const popupOverlayContact = document.getElementById('popup-overlay-contact');
const popupCloseContact = document.getElementById('popup-close-contact');

contactButton.addEventListener('click', (event) => {
    event.stopPropagation();
    popupOverlayContact.style.display = 'flex';
});

popupCloseContact.addEventListener('click', (event) => {
    event.stopPropagation();
    popupOverlayContact.style.display = 'none';
});

popupOverlayContact.addEventListener('click', (event) => {
    if (event.target === popupOverlayContact) {
        popupOverlayContact.style.display = 'none';
    }
});

// Disclaimer Popup
const disclaimerButton = document.getElementById('disclaimer-button');
const popupOverlayDisclaimer = document.getElementById('popup-overlay-disclaimer');
const popupCloseDisclaimer = document.getElementById('popup-close-disclaimer');

disclaimerButton.addEventListener('click', (event) => {
    event.stopPropagation();
    popupOverlayDisclaimer.style.display = 'flex';
});

popupCloseDisclaimer.addEventListener('click', (event) => {
    event.stopPropagation();
    popupOverlayDisclaimer.style.display = 'none';
});

popupOverlayDisclaimer.addEventListener('click', (event) => {
    if (event.target === popupOverlayDisclaimer) {
        popupOverlayDisclaimer.style.display = 'none';
    }
});
};