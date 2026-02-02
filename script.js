// ========== Cœurs en arrière-plan ==========
function createBackgroundHearts() {
    const heartsBg = document.getElementById('heartsBg');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '💘'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-bg';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.animationDuration = (10 + Math.random() * 10) + 's';
        heartsBg.appendChild(heart);
    }

    for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        const tx = (Math.random() - 0.5) * 1000;
        const ty = (Math.random() - 0.5) * 1000;
        sparkle.style.setProperty('--tx', tx + 'px');
        sparkle.style.setProperty('--ty', ty + 'px');
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 5 + 's';
        heartsBg.appendChild(sparkle);
    }
}

// ========== Gestion du bouton NON ==========
const noBtn = document.getElementById('noBtn');
const buttonsContainer = document.getElementById('buttonsContainer');
let isNoBtnMoving = false;

function moveNoButton(mouseX, mouseY) {
    if (isNoBtnMoving) return;
    
    const rect = noBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    
    const distance = Math.sqrt(
        Math.pow(mouseX - btnCenterX, 2) + 
        Math.pow(mouseY - btnCenterY, 2)
    );
    
    const detectionRadius = 80;
    
    if (distance < detectionRadius) {
        isNoBtnMoving = true;
        
        const containerRect = buttonsContainer.getBoundingClientRect();
        const maxX = containerRect.width - rect.width - 20;
        const maxY = containerRect.height - rect.height - 20;
        
        let newX, newY, attempts = 0;
        do {
            newX = Math.random() * maxX;
            newY = Math.random() * maxY;
            
            const newCenterX = containerRect.left + newX + rect.width / 2;
            const newCenterY = containerRect.top + newY + rect.height / 2;
            const newDistance = Math.sqrt(
                Math.pow(mouseX - newCenterX, 2) + 
                Math.pow(mouseY - newCenterY, 2)
            );
            
            attempts++;
            if (newDistance > 200 || attempts > 10) break;
        } while (true);
        
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
        
        setTimeout(() => {
            isNoBtnMoving = false;
        }, 300);
    }
}

document.addEventListener('mousemove', (e) => {
    moveNoButton(e.clientX, e.clientY);
});

document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    moveNoButton(touch.clientX, touch.clientY);
});

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const rect = noBtn.getBoundingClientRect();
    moveNoButton(rect.left + rect.width / 2, rect.top + rect.height / 2);
});

// ========== Gestion du bouton OUI ==========
const yesBtn = document.getElementById('yesBtn');
const celebration = document.getElementById('celebration');

function createConfetti() {
    const colors = ['#ff4081', '#f50057', '#c51162', '#ffffff', '#ffd700', '#ff6ec7'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = -10 + 'px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 1 + 's';
        confetti.style.width = (5 + Math.random() * 10) + 'px';
        confetti.style.height = (5 + Math.random() * 10) + 'px';
        celebration.appendChild(confetti);
    }
}

function createFlyingHearts() {
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '💘'];
    
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'flying-heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        heart.style.left = '50%';
        heart.style.top = '50%';
        
        const angle = (Math.PI * 2 * i) / 30;
        const distance = 200 + Math.random() * 300;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--ty', ty + 'px');
        heart.style.animationDelay = Math.random() * 0.5 + 's';
        
        celebration.appendChild(heart);
    }
}

yesBtn.addEventListener('click', () => {
    celebration.classList.add('active');
    createConfetti();
    createFlyingHearts();
    
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
    }
});

// ========== Initialisation ==========
createBackgroundHearts();

window.addEventListener('load', () => {
    const containerRect = buttonsContainer.getBoundingClientRect();
    const noBtnRect = noBtn.getBoundingClientRect();
    const maxX = containerRect.width - noBtnRect.width - 20;
    const maxY = containerRect.height - noBtnRect.height - 20;
    
    noBtn.style.left = Math.random() * maxX + 'px';
    noBtn.style.top = Math.random() * maxY + 'px';
});
