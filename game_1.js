// Importing Sound Effects
//const introMusic = new Audio("./music/introSong.mp3");
//const shootingSound = new Audio("./music/shoooting.mp3");
//const killEnemySound = new Audio("./music/killEnemy.mp3");
//const gameOverSound = new Audio("./music/gameOver.mp3");

//introMusic.play();
// Basic Environment Setup
const canvas = document.createElement("canvas");
document.querySelector(".myGame").appendChild(canvas);
canvas.width = innerWidth;
canvas.height = innerHeight;
const context = canvas.getContext("2d");
const lightWeaponDamage = 10;
let difficulty = 5;
let AZR_Timer = 0.3;
var gamePaused = false;
var upg_rightmouse = false;
const form = document.querySelector("form");
const scoreBoard = document.querySelector(".scoreBoard");
const coin = document.querySelector(".coin");
const bowoverload = document.querySelector(".bowoverload");
const upgrade1 = document.querySelector(".upgrade1");
const upgrade2 = document.querySelector(".upgrade2");
const upgrade3 = document.querySelector(".upgrade3");
const upgrade7 = document.querySelector(".upgrade7");
const upgrade8 = document.querySelector(".upgrade8");
const upgrade1m = document.querySelector(".upgrade1m");
const upgrade2m = document.querySelector(".upgrade2m");
const upgrade3m = document.querySelector(".upgrade3m");
const upgrade7m = document.querySelector(".upgrade7m");
const web_version = document.querySelector(".web-version");
let playerScore = 0;
let playerCoin = 0;
let upg_bulletspeed = 0;
let upg_randbullet = 0;
let upg_randchance = 0;
let upg_multishoot = 0;
let shootCooldown = 0;
// Basic Functions

// Event Listener for Difficulty form
document.querySelector("input").addEventListener("click", (e) => {
  e.preventDefault();

  // Stoping Music
  //introMusic.pause();

  // making form invisble
  form.style.display = "none";
  // making scoreBoard visble
  scoreBoard.style.display = "block";
  coin.style.display = "block";
  bowoverload.style.display = "block";
  upgrade1.style.display = "block";
  upgrade2.style.display = "block";
  upgrade3.style.display = "block";
  upgrade7.style.display = "block";
  upgrade8.style.display = "block";
  upgrade1m.style.display = "block";
  upgrade2m.style.display = "block";
  upgrade3m.style.display = "block";
  upgrade7m.style.display = "block";
  web_version.style.display = "none";

  //  getting diffculty selected by user
  const userValue = document.getElementById("difficulty").value;

  if (userValue == "Abnormal") {
    difficulty = 250;
  }

  setInterval(function() {
    if (document.hasFocus()) {
      spawnEnemy();
    }
  }, 2000/(difficulty**0.3) - Math.min(1900, AZR_Timer * 5));
  setInterval(function() {
    if (document.hasFocus()) {
      spawnEnemy2();
    }
  }, 5400/(difficulty**0.25) - Math.min(3200, AZR_Timer * 5));
  setInterval(function() {
    if (document.hasFocus()) {
      spawnEnemy3();
    }
  }, 8800/(difficulty**0.25) - Math.min(3200, AZR_Timer * 5));
  return (difficulty = 15);
});

// Endscreen
const gameoverLoader = () => {
  // Creating endscreen div and play again button and high score element
  const gameOverBanner = document.createElement("div");
  const gameOverBtn = document.createElement("button");
  const highScore = document.createElement("div");

  highScore.innerHTML = `当前设备记录：${
    localStorage.getItem("highScore")
      ? localStorage.getItem("highScore")
      : playerScore
  }`;

  const oldHighScore =
    localStorage.getItem("highScore") && localStorage.getItem("highScore");

  if (oldHighScore < playerScore) {
    localStorage.setItem("highScore", playerScore);

    // updating high score html
    highScore.innerHTML = `当前设备记录：${playerScore}`;
  }

  // adding text to playagain button
  gameOverBtn.innerText = "再次挑战";

  gameOverBanner.appendChild(highScore);

  gameOverBanner.appendChild(gameOverBtn);

  // Making reload on clicking playAgain button
  gameOverBtn.onclick = () => {
    window.location.reload();
  };

  gameOverBanner.classList.add("gameover");

  document.querySelector("body").appendChild(gameOverBanner);
};

// ------------------- Creating Player, Enemy, Weapon, Etc Classes-----------------------------------

// Setting player position to center
playerPosition = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

// Creating Player Class
class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 360,
      false
    );
    context.fillStyle = this.color;

    context.fill();
  }
}

// Creating Weapon Class

class Weapon {
  constructor(x, y, radius, color, velocity, damage) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.damage = damage;
  }

  draw() {
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 360,
      false
    );
    context.fillStyle = this.color;
    context.fill();
  }

  update() {
    this.draw();
    this.x += this.velocity.x / 24 * (upg_bulletspeed + 1.01) ** 0.25;
    this.y += this.velocity.y / 24 * (upg_bulletspeed + 1.01) ** 0.25;
  }
}

// Creating Enemy Class

class Enemy {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 360,
      false
    );
    context.fillStyle = this.color;
    context.fill();
  }

  update() {
    this.draw();
    (this.x += this.velocity.x), (this.y += this.velocity.y);
  }
}

// Creating Particle Class
const friction = 0.98;
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.aplha = 1;
  }

  draw() {
    context.save();
    context.globalAlpha = this.aplha;
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      (Math.PI / 180) * 0,
      (Math.PI / 180) * 360,
      false
    );
    context.fillStyle = this.color;
    context.fill();
    context.restore();
  }

  update() {
    this.draw();
    this.velocity.x *= friction;
    this.velocity.y *= friction;

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.aplha -= 0.01;
  }
}

// -------------------------------------------------Main Logic Here -------------------------------------------

// Creating Player Object, Weapons Array, Enemy Array, Etc Array
const hakuyo = new Player(playerPosition.x, playerPosition.y, 15, "white");
const weapons = [];
const enemies = [];
const particles = [];

//----------------------------- Function To Spawn Enemy at Random Location-----------------------------
const spawnEnemy = () => {
  // generating random size for enemy
  const enemySize = 10;//Math.random() * (40 - 5) + 5;
  // generating random color for enemy
  //const enemyColor = `hsl(${Math.floor(Math.random() * 360)},100%,50%)`;
  const enemyColor = `hsl(370,100%,50%)`;

  // random is Enemy Spawn position
  let random;

  // Making Enemy Location Random but only from outsize of screen
  if (Math.random() < 0.5) {
    // Making X equal to very left off of screen or very right off of screen and setting Y to any where vertically
    random = {
      x: Math.random() < 0.5 ? canvas.width + enemySize : 0 - enemySize,
      y: Math.random() * canvas.height,
    };
  } else {
    // Making Y equal to very up off of screen or very down off of screen and setting X to any where horizontally
    random = {
      x: Math.random() * canvas.width,
      y: Math.random() < 0.5 ? canvas.height + enemySize : 0 - enemySize,
    };
  }

  // Finding Angle between center (means Player Position) and enemy position
  const myAngle = Math.atan2(
    canvas.height / 2 - random.y,
    canvas.width / 2 - random.x
  );

  // Making velocity or speed of enemy by multipling chosen difficulty to radian
  const velocity = {
    x: Math.cos(myAngle) * difficulty * 0.8 * Math.min(AZR_Timer/4000, 6),
    y: Math.sin(myAngle) * difficulty * 0.8 * Math.min(AZR_Timer/4000, 6),
  };

  // Adding enemy to enemies array
  enemies.push(new Enemy(random.x, random.y, enemySize, enemyColor, velocity));
};
const spawnEnemy2 = () => {
  const enemySize = 8;
  const enemyColor = `hsl(300,100%,50%)`;
  let random;
  if (Math.random() < 0.5) {
    random = {
      x: Math.random() < 0.5 ? canvas.width + enemySize : 0 - enemySize,
      y: Math.random() * canvas.height,
    };
  } else {
    random = {
      x: Math.random() * canvas.width,
      y: Math.random() < 0.5 ? canvas.height + enemySize : 0 - enemySize,
    };
  }
  const myAngle = Math.atan2(
    canvas.height / 2 - random.y,
    canvas.width / 2 - random.x
  );
  const velocity = {
    x: Math.cos(myAngle) * difficulty * 0.8 * Math.min(AZR_Timer/4000, 6) * 1.6,
    y: Math.sin(myAngle) * difficulty * 0.8 * Math.min(AZR_Timer/4000, 6) * 1.6,
  };
  enemies.push(new Enemy(random.x, random.y, enemySize, enemyColor, velocity));
};
const spawnEnemy3 = () => {
  const enemySize = 30;
  const enemyColor = `hsl(100,100%,50%)`;
  let random;
  if (Math.random() < 0.5) {
    random = {
      x: Math.random() < 0.5 ? canvas.width + enemySize : 0 - enemySize,
      y: Math.random() * canvas.height,
    };
  } else {
    random = {
      x: Math.random() * canvas.width,
      y: Math.random() < 0.5 ? canvas.height + enemySize : 0 - enemySize,
    };
  }
  const myAngle = Math.atan2(
    canvas.height / 2 - random.y,
    canvas.width / 2 - random.x
  );
  const velocity = {
    x: Math.cos(myAngle) * difficulty * 0.8 * Math.min(AZR_Timer/4000, 6) * 1.3,
    y: Math.sin(myAngle) * difficulty * 0.8 * Math.min(AZR_Timer/4000, 6) * 1.3,
  };
  enemies.push(new Enemy(random.x, random.y, enemySize, enemyColor, velocity));
};

// ------------------------------------------------Creating Animation Function ---------------------------------------

let animationId;
function animation() {
  // Making Recursion
  animationId = requestAnimationFrame(animation);

  // Updating Player Score in Score board in html
  scoreBoard.innerHTML = `当前设备记录：${playerScore}`;
  coin.innerHTML = `魔物素材：${playerCoin}`;
  bowoverload.innerHTML = `弓箭超载：${shootCooldown} / 10`;

  // Clearing canvas on each frame
  context.fillStyle = "rgba(49, 49, 49, 1)";

  context.fillRect(0, 0, canvas.width, canvas.height);

  // Drawing Player
  hakuyo.draw();

  // Generating Particles
  particles.forEach((particle, particleIndex) => {
    if (particle.aplha <= 0) {
      particles.splice(particleIndex, 1);
    } else {
      particle.update();
    }
  });

  //   Generating Bullets
  weapons.forEach((weapon, weaponIndex) => {
    weapon.update();

    // Removing Weapons if they are off screen
    if (
      weapon.x + weapon.radius < 1 ||
      weapon.y + weapon.radius < 1 ||
      weapon.x - weapon.radius > canvas.width ||
      weapon.y - weapon.radius > canvas.height
    ) {
      weapons.splice(weaponIndex, 1);
    }
  });

  //  Generating enemies
  enemies.forEach((enemy, enemyIndex) => {
    enemy.update();

    // Finding Distance between player and enemy
    const distanceBetweenPlayerAndEnemy = Math.hypot(
      hakuyo.x - enemy.x,
      hakuyo.y - enemy.y
    );

    // Stoping Game if enemy hit player
    if (distanceBetweenPlayerAndEnemy - hakuyo.radius - enemy.radius < 0.5) {
      cancelAnimationFrame(animationId);
      //gameOverSound.play();
      //shootingSound.pause();
      //killEnemySound.pause();
      return gameoverLoader();
    }

    weapons.forEach((weapon, weaponIndex) => {
      // Finding Distance between weapon and enemy
      const distanceBetweenWeaponAndEnemy = Math.hypot(
        weapon.x - enemy.x,
        weapon.y - enemy.y
      );

      if (distanceBetweenWeaponAndEnemy - weapon.radius - enemy.radius < 1) {
        //killEnemySound.play();

        // Reducing Size of enemy on hit
        if (enemy.radius > weapon.damage + 8) {
          enemy.radius -= 8;
          for (let i = 0; i < enemy.radius * 2; i++) {
            particles.push(
              new Particle(weapon.x, weapon.y, Math.random() * 2, enemy.color, {
                x: (Math.random() - 0.5) * (Math.random() * 2),
                y: (Math.random() - 0.5) * (Math.random() * 2),
              })
            );
          }
          playerCoin += Math.floor(Math.random() * 3 + 1);
          playerScore += 2;
          weapons.splice(weaponIndex, 1);
          //gsap.to(enemy, {
          //  radius: enemy.radius - weapon.damage,
          //});
          //setTimeout(() => {
          //  weapons.splice(weaponIndex, 1);
          //}, 0);
        }
        // Removing enemy on hit if they are below 18
        else {
          for (let i = 0; i < enemy.radius * 2; i++) {
            particles.push(
              new Particle(weapon.x, weapon.y, Math.random() * 2, enemy.color, {
                x: (Math.random() - 0.5) * (Math.random() * 2),
                y: (Math.random() - 0.5) * (Math.random() * 2),
              })
            );
          }
          // increasing player Score when killing one enemy
          playerScore += 10;
          playerCoin += Math.floor(Math.random() * 10 + 5) + parseInt(AZR_Timer / 10);

          // Rendering player Score in scoreboard html element
          scoreBoard.innerHTML = `当前设备记录：${playerScore}`;
          coin.innerHTML = `魔物素材：${playerCoin}`;
          bowoverload.innerHTML = `弓箭超载：${shootCooldown} / 10`;
          setTimeout(() => {
            enemies.splice(enemyIndex, 1);
            weapons.splice(weaponIndex, 1);
          }, 0);
          //refresh();
          
        }
      }
    });
  });
}

// ---------------------------------Adding Event Listeners------------------------

// event Listener for Light Weapon aka left click
canvas.addEventListener("click", (e) => {
  //shootingSound.play();
  // finding angle between player position(center) and click co-ordinates
  shootBullet(e);
});

function shootBullet(e) {
  if (shootCooldown <= 10) {
    if (shootCooldown == 10) {
      shootCooldown += 2;
    }
    shootCooldown += 1;
    if (shootCooldown > 7) {
      bowoverload.classList.add("redout");
    }
    if (shootCooldown > 9) {
      bowoverload.classList.add("exredout");
    }
    const myAngle = Math.atan2(
      e.clientY - canvas.height / 2,
      e.clientX - canvas.width / 2
    );
    // Making const speed for light weapon
    const velocity = {
      x: Math.cos(myAngle) * 6,
      y: Math.sin(myAngle) * 6,
    };
    // Adding light weapon in weapons array
    weapons.push(
      new Weapon(
        canvas.width / 2,
        canvas.height / 2,
        6,
        "white",
        velocity,
        lightWeaponDamage
      )
    );
    if (upg_multishoot >= 1) {
      const myAngle = Math.atan2(
        e.clientY - canvas.height / 2,
        e.clientX - canvas.width / 2
      );
      const velocity1 = {
        x: Math.cos(myAngle - 0.4) * 6,
        y: Math.sin(myAngle - 0.4) * 6,
      };
      weapons.push(
        new Weapon(
          canvas.width / 2,
          canvas.height / 2,
          6,
          "white",
          velocity1,
          lightWeaponDamage
        )
      );
      const velocity2 = {
        x: Math.cos(myAngle + 0.4) * 6,
        y: Math.sin(myAngle + 0.4) * 6,
      };
      weapons.push(
        new Weapon(
          canvas.width / 2,
          canvas.height / 2,
          6,
          "white",
          velocity2,
          lightWeaponDamage
        )
      );
    }
    if (upg_multishoot >= 2) {
      const myAngle = Math.atan2(
        e.clientY - canvas.height / 2,
        e.clientX - canvas.width / 2
      );
      const velocity = {
        x: Math.cos(myAngle) * 6 * -1,
        y: Math.sin(myAngle) * 6 * -1,
      };
      weapons.push(
        new Weapon(
          canvas.width / 2,
          canvas.height / 2,
          6,
          "white",
          velocity,
          lightWeaponDamage
        )
      );
    }
    for (let i = 0; i < upg_randbullet; i++) {
      if (Math.floor(Math.random() * 20) >= (19 - upg_randchance / 2)) {
        const myAngle = Math.floor(Math.random() * 360);
        const velocity = {
          x: Math.cos(myAngle) * 6,
          y: Math.sin(myAngle) * 6,
        };
        weapons.push(
          new Weapon(
            canvas.width / 2,
            canvas.height / 2,
            6,
            "white",
            velocity,
            lightWeaponDamage
          )
        );
      }
    }
  }
};

canvas.addEventListener("contextmenu", (e) => {
  if (upg_rightmouse == true) {
    shootBullet(e);
  }
  e.preventDefault();
  return false;
});

//addEventListener("resize", () => {
//  window.location.reload();
//});

animation();

window.setInterval(function () {
  if (document.hasFocus()) {
    AZR_Timer = AZR_Timer + 1;
  }
}, 500);
window.setInterval(function () {
  if (document.hasFocus() && shootCooldown > 0 && shootCooldown > 8) {
    shootCooldown -= 1;
  }
}, 500);
window.setInterval(function () {
  if (document.hasFocus() && shootCooldown > 0 && shootCooldown <= 8) {
    shootCooldown -= 1;
    bowoverload.classList.remove("exredout");
  }
  if (document.hasFocus() && shootCooldown > 0 && shootCooldown <= 6) {
    bowoverload.classList.remove("redout");
  }
}, 250);

canvas.addEventListener("blur", function() {
  gamePaused = true;
});
canvas.addEventListener("focus", function() {
  gamePaused = false;
});

document.addEventListener("keydown", function(event) {
  if (event.keyCode === 49) {
    upgrade1pr();
  }
  if (event.keyCode === 50) {
    upgrade2pr();
  }
  if (event.keyCode === 51) {
    upgrade3pr();
  }
  if (event.keyCode === 55) {
    upgrade7pr();
  }
  if (event.keyCode === 56) {
    if (playerCoin >= 1500 && upg_rightmouse == false) {
      playerCoin -= 1500;
      upg_rightmouse = true;
      upgrade8.innerHTML = "";
    }
  }
  if (event.keyCode === 48) {
    playerCoin += 1000;
  }
  //refresh();
});

function refresh() {
  upgrade1.classList.add("hidden");
  if (playerCoin >= 30 && upg_bulletspeed == 0) {
    upgrade1.classList.remove("hidden");
  }
  if (playerCoin >= 60 && upg_bulletspeed == 1) {
    upgrade1.classList.remove("hidden");
  }
  if (playerCoin >= 120 && upg_bulletspeed == 2) {
    upgrade1.classList.remove("hidden");
  }
  if (playerCoin >= 300 && upg_bulletspeed == 3) {
    upgrade1.classList.remove("hidden");
  }
  if (playerCoin >= 500 && upg_bulletspeed == 4) {
    upgrade1.classList.remove("hidden");
  }
  if (playerCoin >= 800 && upg_bulletspeed == 5) {
    upgrade1.classList.remove("hidden");
  }
  if (playerCoin >= 1000 && upg_bulletspeed == 6) {
    upgrade1.classList.remove("hidden");
  }
  if (playerCoin >= 1000 && upg_bulletspeed == 7) {
    upgrade1.classList.remove("hidden");
  }
  if (playerCoin >= 1000 && upg_bulletspeed == 8) {
    upgrade1.classList.remove("hidden");
  }
  if (playerCoin >= 1000 && upg_bulletspeed == 9) {
    upgrade1.classList.remove("hidden");
  }
  if (playerCoin >= 30 && upg_randbullet == 0) {
    upgrade2.classList.remove("hidden");
  }
  if (playerCoin >= 100 && upg_randbullet == 1) {
    upgrade2.classList.remove("hidden");
  }
  if (playerCoin >= 300 && upg_randbullet == 2) {
    upgrade2.classList.remove("hidden");
  }
  if (playerCoin >= 600 && upg_randbullet == 3) {
    upgrade2.classList.remove("hidden");
  }
  if (playerCoin >= 1000 && upg_randbullet == 4) {
    upgrade2.classList.remove("hidden");
  }
  if (playerCoin >= 2000 && upg_randbullet == 5) {
    upgrade2.classList.remove("hidden");
  }
  if (playerCoin >= 50 && upg_randchance == 0) {
    upgrade3.classList.remove("hidden");
  }
  if (playerCoin >= 200 && upg_randchance == 1) {
    upgrade3.classList.remove("hidden");
  }
  if (playerCoin >= 400 && upg_randchance == 2) {
    upgrade3.classList.remove("hidden");
  }
  if (playerCoin >= 600 && upg_randchance == 3) {
    upgrade3.classList.remove("hidden");
  }
  if (playerCoin >= 1000 && upg_randchance == 4) {
    upgrade3.classList.remove("hidden");
  }
}


document.getElementById("upgrade1").addEventListener("click", function(event) {
  upgrade1pr();
});
document.getElementById("upgrade2").addEventListener("click", function(event) {
  upgrade2pr();
});
document.getElementById("upgrade3").addEventListener("click", function(event) {
  upgrade3pr();
});
document.getElementById("upgrade7").addEventListener("click", function(event) {
  upgrade7pr();
});

function upgrade1pr() {
  if (playerCoin >= 1000 && upg_bulletspeed == 9) {
    playerCoin -= 1000;
    upg_bulletspeed += 1;
    upgrade1.innerHTML = "数字1：升级射速 当前等级LV10 花费？素材";
    upgrade1m.innerHTML = "箭速 ？";
  }
  if (playerCoin >= 1000 && upg_bulletspeed == 8) {
    playerCoin -= 1000;
    upg_bulletspeed += 1;
    upgrade1.innerHTML = "数字1：升级射速 当前等级LV9 花费1000素材";
    upgrade1m.innerHTML = "箭速 1000";
  }
  if (playerCoin >= 1000 && upg_bulletspeed == 7) {
    playerCoin -= 1000;
    upg_bulletspeed += 1;
    upgrade1.innerHTML = "数字1：升级射速 当前等级LV8 花费1000素材";
    upgrade1m.innerHTML = "箭速 1000";
  }
  if (playerCoin >= 1000 && upg_bulletspeed == 6) {
    playerCoin -= 1000;
    upg_bulletspeed += 1;
    upgrade1.innerHTML = "数字1：升级射速 当前等级LV7 花费1000素材";
    upgrade1m.innerHTML = "箭速 1000";
  }
  if (playerCoin >= 800 && upg_bulletspeed == 5) {
    playerCoin -= 800;
    upg_bulletspeed += 1;
    upgrade1.innerHTML = "数字1：升级射速 当前等级LV6 花费1000素材";
    upgrade1m.innerHTML = "箭速 1000";
  }
  if (playerCoin >= 500 && upg_bulletspeed == 4) {
    playerCoin -= 500;
    upg_bulletspeed += 1;
    upgrade1.innerHTML = "数字1：升级射速 当前等级LV5 花费800素材";
    upgrade1m.innerHTML = "箭速 800";
  }
  if (playerCoin >= 300 && upg_bulletspeed == 3) {
    playerCoin -= 300;
    upg_bulletspeed += 1;
    upgrade1.innerHTML = "数字1：升级射速 当前等级LV4 花费500素材";
    upgrade1m.innerHTML = "箭速 500";
  }
  if (playerCoin >= 120 && upg_bulletspeed == 2) {
    playerCoin -= 120;
    upg_bulletspeed += 1;
    upgrade1.innerHTML = "数字1：升级射速 当前等级LV3 花费300素材";
    upgrade1m.innerHTML = "箭速 300";
  }
  if (playerCoin >= 60 && upg_bulletspeed == 1) {
    playerCoin -= 60;
    upg_bulletspeed += 1;
    upgrade1.innerHTML = "数字1：升级射速 当前等级LV2 花费120素材";
    upgrade1m.innerHTML = "箭速 120";
  }
  if (playerCoin >= 30 && upg_bulletspeed == 0) {
    playerCoin -= 30;
    upg_bulletspeed += 1;
    upgrade1.innerHTML = "数字1：升级射速 当前等级LV1 花费60素材";
    upgrade1m.innerHTML = "箭速 60";
  }
};


function upgrade2pr() {
  if (playerCoin >= 2000 && upg_randbullet == 5) {
    playerCoin -= 2000;
    upg_randbullet += 1;
    upgrade2.innerHTML = "数字2：箭矢散射 当前等级LV6 花费？素材";
    upgrade2m.innerHTML = "散射 ？";
  }
  if (playerCoin >= 1000 && upg_randbullet == 4) {
    playerCoin -= 1000;
    upg_randbullet += 1;
    upgrade2.innerHTML = "数字2：箭矢散射 当前等级LV5 花费2000素材";
    upgrade2m.innerHTML = "散射 2000";
  }
  if (playerCoin >= 600 && upg_randbullet == 3) {
    playerCoin -= 600;
    upg_randbullet += 1;
    upgrade2.innerHTML = "数字2：箭矢散射 当前等级LV4 花费1000素材";
    upgrade2m.innerHTML = "散射 1000";
  }
  if (playerCoin >= 300 && upg_randbullet == 2) {
    playerCoin -= 300;
    upg_randbullet += 1;
    upgrade2.innerHTML = "数字2：箭矢散射 当前等级LV3 花费600素材";
    upgrade2m.innerHTML = "散射 600";
  }
  if (playerCoin >= 100 && upg_randbullet == 1) {
    playerCoin -= 100;
    upg_randbullet += 1;
    upgrade2.innerHTML = "数字2：箭矢散射 当前等级LV2 花费300素材";
    upgrade2m.innerHTML = "散射 300";
  }
  if (playerCoin >= 30 && upg_randbullet == 0) {
    playerCoin -= 30;
    upg_randbullet += 1;
    upgrade2.innerHTML = "数字2：箭矢散射 当前等级LV1 花费100素材";
    upgrade2m.innerHTML = "散射 100";
  }
}
function upgrade3pr() {
  if (playerCoin >= 1000 && upg_randchance == 4) {
    playerCoin -= 1000;
    upg_randchance += 1;
    upgrade3.innerHTML = "数字3：散箭概率 当前等级LV5 花费？素材";
    upgrade3m.innerHTML = "散率 ？";
  }
  if (playerCoin >= 600 && upg_randchance == 3) {
    playerCoin -= 600;
    upg_randchance += 1;
    upgrade3.innerHTML = "数字3：散箭概率 当前等级LV4 花费1000素材";
    upgrade3m.innerHTML = "散率 1000";
  }
  if (playerCoin >= 400 && upg_randchance == 2) {
    playerCoin -= 400;
    upg_randchance += 1;
    upgrade3.innerHTML = "数字3：散箭概率 当前等级LV3 花费600素材";
    upgrade3m.innerHTML = "散率 600";
  }
  if (playerCoin >= 200 && upg_randchance == 1) {
    playerCoin -= 200;
    upg_randchance += 1;
    upgrade3.innerHTML = "数字3：散箭概率 当前等级LV2 花费400素材";
    upgrade3m.innerHTML = "散率 400";
  }
  if (playerCoin >= 50 && upg_randchance == 0) {
    playerCoin -= 50;
    upg_randchance += 1;
    upgrade3.innerHTML = "数字3：散箭概率 当前等级LV1 花费200素材";
    upgrade3m.innerHTML = "散率 200";
  }
}
function upgrade7pr() {
  if (playerCoin >= 1000 && upg_multishoot == 1) {
    playerCoin -= 1000;
    upg_multishoot += 1;
    upgrade7.innerHTML = "";
    upgrade7m.innerHTML = "";
  }
  if (playerCoin >= 800 && upg_multishoot == 0) {
    playerCoin -= 800;
    upg_multishoot += 1;
    upgrade7.innerHTML = "数字7：背后射击 花费1000素材";
    upgrade7m.innerHTML = "多重 1000";
  }
}