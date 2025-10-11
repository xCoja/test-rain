

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.bubbles-container');
  if (!container) return;

  const COUNT = 100;

  for (let i = 0; i < COUNT; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';

    const size = Math.random() * 4 + 3;                 // 6–14px (visible)
    const left = Math.random() * 100;                   // 0–100%
    const delay = Math.random() * 12;                   // 0–12s
    const dur = Math.random() * 12 + 12;                // 12–24s (speed variety)
    const alpha = Math.random() * 0.4 + 0.25;           // 0.25–0.65 (visible)
    const hue = 210;                                    // bluish; tweak if you want

    b.style.width = `${size}px`;
    b.style.height = `${size}px`;
    b.style.left = `${left}%`;
    b.style.background = `rgba(${42}, ${117}, ${255}, ${alpha})`; // use rgba()

    // independent delays/durations for each animation
    b.style.animationDuration = `${dur}s, 6s`;
    b.style.animationDelay = `${delay}s, ${delay / 2}s`;

    container.appendChild(b);
  }
});









const claimButtons = document.querySelectorAll('.claim-btn');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');
const closeBtn = document.getElementById('close-btn');

claimButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const rank = btn.dataset.rank;
    const wager = btn.dataset.wager;
    const reward = btn.dataset.reward;

   

  
  });
});







// ===== Claim Bonus Popup (for all card buttons) =====
const claimBonusOverlay = document.getElementById('claim-bonus-overlay');
const claimBonusClose = document.getElementById('claim-bonus-close');
const popupTitleEl = claimBonusOverlay.querySelector('h2');

function openClaimBonus(rankLabel) {
  // Optional: show which rank the user clicked
  if (rankLabel) {
    popupTitleEl.textContent = `How to Claim Your Bonus — ${rankLabel}`;
  } else {
    popupTitleEl.textContent = 'How to Claim Your Bonus';
  }

  claimBonusOverlay.style.display = 'flex';
  document.body.classList.add('modal-open');
}

function closeClaimBonus() {
  claimBonusOverlay.style.display = 'none';
  document.body.classList.remove('modal-open');
}

// Open when clicking ANY .claim-btn
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.claim-btn');
  if (!btn) return;

  e.preventDefault();

  // Try to grab the rank text from the same card (optional nicety)
  const card = btn.closest('.card');
  const rankText = card?.querySelector('.rank-line')?.textContent?.trim();

  openClaimBonus(rankText);
});

// Close on X
claimBonusClose.addEventListener('click', (e) => {
  e.stopPropagation();
  closeClaimBonus();
});

// Close on overlay click (but not when clicking inside content)
claimBonusOverlay.addEventListener('click', (e) => {
  if (e.target === claimBonusOverlay) closeClaimBonus();
});

// Close on Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeClaimBonus();
});































// Contact Popup
const contactButton = document.getElementById('contact-button');
const popupOverlayContact = document.getElementById('popup-overlay-contact');
const popupCloseContact = document.getElementById('popup-close-contact');

contactButton.addEventListener('click', (event) => {
  event.preventDefault(); // ⬅ stop anchor from scrolling
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
  event.preventDefault(); // ⬅ stop anchor from scrolling
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
