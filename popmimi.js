const container = document.getElementById('popmimicontainer');
const mimi = document.getElementById('popmimi');
let poppedOut = false;

function shouldPopOut() {
  const rng = Math.random();
  return rng < 0.03;
}

function popOut() {
  if (poppedOut) return;
  mimi.style.transition = 'transform 3s';
  mimi.style.transform = 'translateX(-45%)';
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
