// script.js
// Cyber Games and interactive features

document.addEventListener('DOMContentLoaded', function() {
  // Carousel functionality
  const leftArrow = document.querySelector('.carousel-arrow.left');
  const rightArrow = document.querySelector('.carousel-arrow.right');
  const track = document.querySelector('.carousel-track');
  if (leftArrow && rightArrow && track) {
    leftArrow.addEventListener('click', () => {
      track.scrollBy({ left: -340, behavior: 'smooth' });
    });
    rightArrow.addEventListener('click', () => {
      track.scrollBy({ left: 340, behavior: 'smooth' });
    });
  }
  
  // Contact terminal typewriter
  typeContactLines();
  
  // Cyber Games functionality
  const gameToggle = document.getElementById('game-toggle');
  const gameContainer = document.getElementById('game-container');
  const gameSelection = document.getElementById('game-selection');
  const redGame = document.getElementById('red-game');
  const blueGame = document.getElementById('blue-game');
  
  // Game state variables
  let currentGame = null;
  let redScore = 0;
  let blueScore = 0;
  let redTimeLeft = 30;
  let blueTimeLeft = 30;
  let gameActive = false;
  let gameTimer;
  let threatSpawnTimer;
  
  // Toggle game
  gameToggle.addEventListener('click', function() {
    if (gameContainer.classList.contains('active')) {
      // Hide game
      gameContainer.classList.remove('active');
      gameToggle.textContent = '▶';
      stopCurrentGame();
    } else {
      // Show game selection
      gameContainer.classList.add('active');
      gameToggle.textContent = '⏸';
      showGameSelection();
    }
  });
  
  // Team selection buttons
  document.querySelectorAll('.team-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const gameType = this.dataset.game;
      if (gameType === 'red') {
        startRedTeamGame();
      } else if (gameType === 'blue') {
        startBlueTeamGame();
      }
    });
  });
  
  // Red Team Game (Target Hacking)
  const redTarget = document.getElementById('red-target');
  const redScoreEl = document.getElementById('red-score');
  const redTimeEl = document.getElementById('red-time');
  
  redTarget.addEventListener('click', function() {
    if (gameActive && currentGame === 'red') {
      redScore++;
      redScoreEl.textContent = redScore;
      
      // Visual feedback
      redTarget.classList.add('clicked');
      setTimeout(() => {
        redTarget.classList.remove('clicked');
      }, 300);
      
      // Move target to random position
      moveRedTarget();
    }
  });
  
  function moveRedTarget() {
    const container = redGame;
    const maxX = container.offsetWidth - 60;
    const maxY = container.offsetHeight - 60;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    redTarget.style.position = 'absolute';
    redTarget.style.left = newX + 'px';
    redTarget.style.top = newY + 'px';
  }
  
  // Blue Team Game (Threat Blocking)
  const threatContainer = document.getElementById('threat-container');
  const blueScoreEl = document.getElementById('blue-score');
  const blueTimeEl = document.getElementById('blue-time');
  
  function createThreat() {
    if (!gameActive || currentGame !== 'blue') return;
    
    const threat = document.createElement('div');
    threat.className = 'threat';
    threat.textContent = '🦠';
    threat.style.top = Math.random() * 150 + 'px';
    
    threat.addEventListener('click', function() {
      if (gameActive && currentGame === 'blue') {
        blueScore++;
        blueScoreEl.textContent = blueScore;
        
        // Visual feedback
        threat.classList.add('clicked');
        setTimeout(() => {
          threat.remove();
        }, 500);
      }
    });
    
    threatContainer.appendChild(threat);
    
    // Remove threat after animation
    setTimeout(() => {
      if (threat.parentNode) {
        threat.remove();
      }
    }, 3000);
  }
  
  // Game control functions
  function showGameSelection() {
    gameSelection.style.display = 'block';
    redGame.style.display = 'none';
    blueGame.style.display = 'none';
    currentGame = null;
    stopCurrentGame();
  }
  
  function startRedTeamGame() {
    gameSelection.style.display = 'none';
    redGame.style.display = 'block';
    blueGame.style.display = 'none';
    currentGame = 'red';
    redScore = 0;
    redTimeLeft = 30;
    gameActive = true;
    
    redScoreEl.textContent = redScore;
    redTimeEl.textContent = redTimeLeft;
    
    // Position target initially
    moveRedTarget();
    
    gameTimer = setInterval(() => {
      redTimeLeft--;
      redTimeEl.textContent = redTimeLeft;
      
      if (redTimeLeft <= 0) {
        stopCurrentGame();
        alert(`Red Team Mission Complete!\nTargets Hacked: ${redScore}`);
        showGameSelection();
      }
    }, 1000);
  }
  
  function startBlueTeamGame() {
    gameSelection.style.display = 'none';
    redGame.style.display = 'none';
    blueGame.style.display = 'block';
    currentGame = 'blue';
    blueScore = 0;
    blueTimeLeft = 30;
    gameActive = true;
    
    blueScoreEl.textContent = blueScore;
    blueTimeEl.textContent = blueTimeLeft;
    
    // Clear existing threats
    threatContainer.innerHTML = '';
    
    // Spawn threats periodically
    threatSpawnTimer = setInterval(createThreat, 1500);
    
    gameTimer = setInterval(() => {
      blueTimeLeft--;
      blueTimeEl.textContent = blueTimeLeft;
      
      if (blueTimeLeft <= 0) {
        stopCurrentGame();
        alert(`Blue Team Mission Complete!\nThreats Blocked: ${blueScore}`);
        showGameSelection();
      }
    }, 1000);
  }
  
  function stopCurrentGame() {
    gameActive = false;
    if (gameTimer) {
      clearInterval(gameTimer);
    }
    if (threatSpawnTimer) {
      clearInterval(threatSpawnTimer);
    }
  }
  
  // Global function for back button
  window.showGameSelection = showGameSelection;
});

// Contact terminal typewriter effect
const contactLines = [
  'Email: rubabaliqureshi@gmail.com',
  'Phone: +92 333 7331062',
  'Location: Jacobabad, Sindh, Pakistan',
  'LinkedIn: <a href="https://www.linkedin.com/in/rubab-ali-830893311" target="_blank" style="color: #00fff7; text-decoration: underline;"><i class="fa-brands fa-linkedin"></i> rubab-ali-830893311</a>'
];

function typeWriter(text, el, speed, cb) {
  let i = 0;
  function type() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(type, speed);
    } else if (cb) {
      cb();
    }
  }
  type();
}

function typeContactLines() {
  const el1 = document.getElementById('contact-line-1');
  const el2 = document.getElementById('contact-line-2');
  const el3 = document.getElementById('contact-line-3');
  const el4 = document.getElementById('contact-line-4');
  el1.textContent = '';
  el2.textContent = '';
  el3.textContent = '';
  el4.innerHTML = '';
  typeWriter(contactLines[0], el1, 40, () => {
    setTimeout(() => {
      typeWriter(contactLines[1], el2, 40, () => {
        setTimeout(() => {
          typeWriter(contactLines[2], el3, 40, () => {
            setTimeout(() => {
              el4.innerHTML = contactLines[3];
            }, 200);
          });
        }, 200);
      });
    }, 200);
  });
} 