const container = document.getElementById('popmimicontainer');
const mimi = document.getElementById('popmimi');
let poppedOut = false;

function shouldPopOut() {
  const rng = Math.random();
  return rng < 0.02;
}

function popOut() {
  if (poppedOut) return;
  mimi.style.transition = 'transform 3s';
  const rng2 = Math.random();
  if (rng2 <= 0.2) {
    mimi.style.transform = 'translateX(-45%) translateY(-45%)';
  }
  if (rng2 > 0.2 && rng2 <= 0.4) {
    mimi.style.transform = 'translateX(-45%) translateY(-30%)';
  }
  if (rng2 > 0.4 && rng2 <= 0.6) {
    mimi.style.transform = 'translateX(-45%) translateY(-15%)';
  }
  if (rng2 > 0.6 && rng2 <= 0.8) {
    mimi.style.transform = 'translateX(-45%) translateY(-0%)';
  }
  if (rng2 > 0.8) {
    mimi.style.transform = 'translateX(-45%) translateY(-15%)';
  }
  poppedOut = true;
}

function flee() {
  if (!poppedOut) return;

  mimi.style.transition = 'transform 0.5s';
  mimi.style.transform = 'translateX(45%)';
  poppedOut = false;
}

mimi.addEventListener('mouseover', flee);

function checkPopOut() {
  if (shouldPopOut()) {
    popOut();
  }
}

setInterval(checkPopOut, 1000);
