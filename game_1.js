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
let lightWeaponDamage = 10;
let taketori_hisatsu = 0;
let difficulty = 85;
let health = 3;
let AZR_Timer = 0.3;
let AZR_Timer_slow = 5;
let muteki = 0;
var gamePaused = false;
var upg_rightmouse = false;
const form = document.querySelector("form");
const scoreBoard = document.querySelector(".scoreBoard");
const coin = document.querySelector(".coin");
const bowoverload = document.querySelector(".bowoverload");
const bowoverloadbar = document.querySelector(".bowoverloadbar");
const hisatsucharge = document.querySelector(".hisatsucharge");
const healthbar = document.querySelector(".healthbar");
const azrtimer = document.querySelector(".azrtimer");
const hisatsuwaza = document.querySelector(".hisatsuwaza");
const upgrade1 = document.querySelector(".upgrade1");
const upgrade2 = document.querySelector(".upgrade2");
const upgrade3 = document.querySelector(".upgrade3");
const upgrade4 = document.querySelector(".upgrade4");
const upgrade5 = document.querySelector(".upgrade5");
const upgrade6 = document.querySelector(".upgrade6");
const upgrade7 = document.querySelector(".upgrade7");
const upgrade8 = document.querySelector(".upgrade8");
const hisatsuwazam = document.querySelector(".hisatsuwazam");
const upgrade1m = document.querySelector(".upgrade1m");
const upgrade2m = document.querySelector(".upgrade2m");
const upgrade3m = document.querySelector(".upgrade3m");
const upgrade4m = document.querySelector(".upgrade4m");
const upgrade5m = document.querySelector(".upgrade5m");
const upgrade6m = document.querySelector(".upgrade6m");
const upgrade7m = document.querySelector(".upgrade7m");
const web_version = document.querySelector(".web-version");
let playerScore = 0;
let playerCoin = 0;
let upg_bulletspeed = 0;
let upg_randbullet = 0;
let upg_randchance = 0;
let upg_multishoot = 0;
let upg_health = 0;
let upg_charge = 0;
let upg_pierce = 0;
let shootCooldown = 0;
let hisatsuCooldown = 0;
var interval1;
var interval2;
var interval3;
var interval4;
var interval5;
var interval6;
var interval7;
var interval8;
var gamestart = false;
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
  gamestart = true;
  bowoverload.style.display = "block";
  bowoverloadbar.style.display = "block";
  hisatsucharge.style.display = "block";
  hisatsuwaza.style.display = "block";
  healthbar.style.display = "block";
  azrtimer.style.display = "block";
  upgrade1.style.display = "block";
  upgrade2.style.display = "block";
  upgrade3.style.display = "block";
  upgrade4.style.display = "block";
  upgrade5.style.display = "block";
  upgrade6.style.display = "block";
  upgrade7.style.display = "block";
  upgrade8.style.display = "block";
  hisatsuwazam.style.display = "block";
  upgrade1m.style.display = "block";
  upgrade2m.style.display = "block";
  upgrade3m.style.display = "block";
  upgrade4m.style.display = "block";
  upgrade5m.style.display = "block";
  upgrade6m.style.display = "block";
  upgrade7m.style.display = "block";
  web_version.style.display = "none";

  //  getting diffculty selected by user
  const userValue = document.getElementById("difficulty").value;
  const userChara = document.getElementById("character").value;

  if (userChara == "Taketori") {
    lightWeaponDamage = 5;
    hisatsuwaza.innerHTML = `空格：吟唱 煌晷的业莲`;
  }
  if (userChara == "Ayamado") {
    lightWeaponDamage = 20;
    hisatsuwaza.innerHTML = `空格：施放 空泠断灭`;
  }

  if (userValue == "Casual") {
    difficulty = 15;
  }
  if (userValue == "Abnormal") {
    difficulty = 305;
  }
  timeout1 = setTimeout(spawnEnemy, 2000/(difficulty**0.3) - Math.min(1900, (AZR_Timer*7) ** 1.5));
  timeout2 = setTimeout(spawnEnemy2, 5400/(difficulty**0.25) - Math.min(3900, (AZR_Timer*7) ** 1.5));
  timeout3 = setTimeout(spawnEnemy3, 8800/(difficulty**0.25) - Math.min(5000, (AZR_Timer*7) ** 1.5));
  timeout4 = setTimeout(spawnEnemy4, 20000/(difficulty**0.25) - Math.min(5000, (AZR_Timer*7) ** 1.5));
  return;//(difficulty = 15);
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
    this.pierce = upg_pierce;
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
  if (document.hasFocus()) {
    // generating random size for enemy
    //Math.random() * (40 - 5) + 5;
    let enemySize = 10;
    let enemyColor = `hsl(370,100%,50%)`;
    const userChara = document.getElementById("character").value;
    if (Math.random() < 0.2) {
       enemySize = 18;
       enemyColor = `hsl(350,100%,50%)`;
    }
    // generating random color for enemy
    //const enemyColor = `hsl(${Math.floor(Math.random() * 360)},100%,50%)`;

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
      x: Math.cos(myAngle) * difficulty * 0.8 * (Math.min(AZR_Timer_slow/3900, 8) ** 0.92),
      y: Math.sin(myAngle) * difficulty * 0.8 * (Math.min(AZR_Timer_slow/3900, 8) ** 0.92),
    };

    // Adding enemy to enemies array
    enemies.push(new Enemy(random.x, random.y, enemySize, enemyColor, velocity));
  }
  timeout1 = setTimeout(spawnEnemy, 2000/(difficulty**0.3) - Math.min(1900, (AZR_Timer*7) ** 1.5));
};
const spawnEnemy2 = () => {
  if (document.hasFocus() && AZR_Timer >= 1.5) {
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
      x: Math.cos(myAngle) * difficulty * 0.8 * (Math.min(AZR_Timer_slow/3200, 12) ** 0.85) * 1.6,
      y: Math.sin(myAngle) * difficulty * 0.8 * (Math.min(AZR_Timer_slow/3200, 12) ** 0.85) * 1.6,
    };
    enemies.push(new Enemy(random.x, random.y, enemySize, enemyColor, velocity));
  }
  timeout2 = setTimeout(spawnEnemy2, 5400/(difficulty**0.25) - Math.min(3900, (AZR_Timer*7) ** 1.5));
};
const spawnEnemy3 = () => {
  if (document.hasFocus() && AZR_Timer >= 2.5) {
    let enemySize = 30;
    let enemyColor = `hsl(100,100%,50%)`;
    if (Math.random() < 0.2) {
       enemySize = 40;
       enemyColor = `hsl(80,100%,50%)`;
    }
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
      x: Math.cos(myAngle) * difficulty * 0.7 * (Math.min(AZR_Timer_slow/4300, 6) ** 1.2) * 0.9,
      y: Math.sin(myAngle) * difficulty * 0.7 * (Math.min(AZR_Timer_slow/4300, 6) ** 1.2) * 0.9,
    };
    enemies.push(new Enemy(random.x, random.y, enemySize, enemyColor, velocity));
  }
  timeout3 = setTimeout(spawnEnemy3, 8800/(difficulty**0.25) - Math.min(5000, (AZR_Timer*7) ** 1.5));
};
const spawnEnemy4 = () => {
  if (document.hasFocus() && AZR_Timer >= 3.5) {
    const enemySize = 120;
    const enemyColor = `hsl(30,100%,50%)`;
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
      x: Math.cos(myAngle) * difficulty * 0.7 * (Math.min(AZR_Timer_slow/4300, 6) ** 1.2) * 0.3,
      y: Math.sin(myAngle) * difficulty * 0.7 * (Math.min(AZR_Timer_slow/4300, 6) ** 1.2) * 0.3,
    };
    enemies.push(new Enemy(random.x, random.y, enemySize, enemyColor, velocity));
  }
  timeout4 = setTimeout(spawnEnemy4, 20000/(difficulty**0.25) - Math.min(5000, (AZR_Timer*7) ** 1.5));
};

// ------------------------------------------------Creating Animation Function ---------------------------------------

let animationId;
function animation() {
  const userChara = document.getElementById("character").value;
  // Making Recursion
  animationId = requestAnimationFrame(animation);

  // Updating Player Score in Score board in html
  scoreBoard.innerHTML = `当前分数：${playerScore}`;
  coin.innerHTML = `魔物素材：${playerCoin}`;
  azrtimer.innerHTML = `${AZR_Timer}&nbsp&nbsp ${AZR_Timer_slow}`;
  //bowoverloadbar.innerHTML = `${shootCooldown} / 10`;
  if (userChara != "Ayamado") {
    bowoverload.innerHTML = `射速过载：${shootCooldown} / 10`;
    bowoverloadbar.innerHTML = ` I`.repeat(shootCooldown)+ ` .`.repeat(13 - shootCooldown);
  }
  if (userChara == "Ayamado") {
    bowoverload.innerHTML = `射速过载：${shootCooldown} / 7`;
    bowoverloadbar.innerHTML = ` I`.repeat(shootCooldown)+ ` .`.repeat(10 - shootCooldown);
  }
  if (userChara == "Hakuyo") {
    hisatsucharge.innerHTML = ` ◆`.repeat(hisatsuCooldown)+ ` ◇`.repeat(5 - hisatsuCooldown);
  }
  if (userChara == "Taketori") {
    hisatsucharge.innerHTML = ` ◆`.repeat(hisatsuCooldown)+ ` ◇`.repeat(4 - hisatsuCooldown);
  }
  if (userChara == "Ayamado") {
    hisatsucharge.innerHTML = ` ◆`.repeat(hisatsuCooldown)+ ` ◇`.repeat(3 - hisatsuCooldown);
  }
  healthbar.innerHTML = ` ❤`.repeat(health)+ `  ♡`.repeat(3 - health + upg_health);

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
    if ((distanceBetweenPlayerAndEnemy - hakuyo.radius - enemy.radius < -2) && muteki <= 1) {
      if (health > 1) {
        if (userChara == "Taketori") {
          hisatsuCooldown = 4;
          taketori_hisatsu -= 4;
          hisatsuCooldown -= 4;
          health -= 1;
          muteki += 10;
          for (let j = 0; j < 4; j++) {
            const myAngle = Math.floor(Math.random() * 360);
            for (let i = 0; i <= 15; i++) {
              const velocity1 = {
                x: Math.cos(myAngle - i*0.1) * (16 - i*0.3 **-0.3),
                y: Math.sin(myAngle - i*0.1) * (16 - i*0.3 **-0.3),
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
                x: Math.cos(myAngle + i*0.1) * (16 - i*0.3 **-0.3),
                y: Math.sin(myAngle + i*0.1) * (16 - i*0.3 **-0.3),
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
            };
          }
        }
        if (userChara == "Hakuyo") {
          hisatsuCooldown = 5;
          hisatsu();
          health -= 1;
          muteki += 10;
        }
        if (userChara == "Ayamado") {
          hisatsuCooldown = 3;
          hisatsu();
          health -= 1;
          muteki += 10;
        }
      } else {
        cancelAnimationFrame(animationId);
        //gameOverSound.play();
        //shootingSound.pause();
        //killEnemySound.pause();
        return gameoverLoader();
      }
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
          for (let i = 0; i < enemy.radius * 3; i++) {
            particles.push(
              new Particle(weapon.x, weapon.y, Math.random() * 2, enemy.color, {
                x: (Math.random() - 0.5) * (Math.random() * 3),
                y: (Math.random() - 0.5) * (Math.random() * 3),
              })
            );
          }
          // increasing player Score when killing one enemy
          playerScore += 10;
          playerCoin += Math.floor(Math.random() * 10 + 5) + parseInt(AZR_Timer / 10);

          // Rendering player Score in scoreboard html element
          scoreBoard.innerHTML = `当前分数：${playerScore}`;
          coin.innerHTML = `魔物素材：${playerCoin}`;
          azrtimer.innerHTML = `${AZR_Timer}&nbsp&nbsp ${AZR_Timer_slow}`;
          //bowoverloadbar.innerHTML = `${shootCooldown} / 10`;
          if (userChara != "Ayamado") {
            bowoverload.innerHTML = `射速过载：${shootCooldown} / 10`;
            bowoverloadbar.innerHTML = ` I`.repeat(shootCooldown)+ ` .`.repeat(13 - shootCooldown);
          }
          if (userChara == "Ayamado") {
            bowoverload.innerHTML = `射速过载：${shootCooldown} / 7`;
            bowoverloadbar.innerHTML = ` I`.repeat(shootCooldown)+ ` .`.repeat(10 - shootCooldown);
          }
          if (userChara == "Hakuyo") {
            hisatsucharge.innerHTML = ` ◆`.repeat(hisatsuCooldown)+ ` ◇`.repeat(5 - hisatsuCooldown);
          }
          if (userChara == "Taketori") {
            hisatsucharge.innerHTML = ` ◆`.repeat(hisatsuCooldown)+ ` ◇`.repeat(4 - hisatsuCooldown);
          }
          if (userChara == "Ayamado") {
            hisatsucharge.innerHTML = ` ◆`.repeat(hisatsuCooldown)+ ` ◇`.repeat(3 - hisatsuCooldown);
          }
          healthbar.innerHTML = ` ❤`.repeat(health)+ `  ♡`.repeat(3 - health + upg_health);
          setTimeout(() => {
            enemies.splice(enemyIndex, 1);
            if (weapon.pierce <= 0) {
              weapons.splice(weaponIndex, 1);
            } else {
              weapon.pierce -= 1;
            }
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
  if (taketori_hisatsu > 0) {
    taketori_hisat(e);
    taketori_hisatsu -= 1;
    hisatsuCooldown -= 1;
  } else {
    shootBullet(e);
  }
});

function taketori_hisat(e) {
  const myAngle = Math.atan2(
    e.clientY - canvas.height / 2,
    e.clientX - canvas.width / 2
  );
  for (let i = 0; i <= 15; i++) {
    const velocity1 = {
      x: Math.cos(myAngle - i*0.1) * (16 - i*0.3 **-0.3),
      y: Math.sin(myAngle - i*0.1) * (16 - i*0.3 **-0.3),
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
      x: Math.cos(myAngle + i*0.1) * (16 - i*0.3 **-0.3),
      y: Math.sin(myAngle + i*0.1) * (16 - i*0.3 **-0.3),
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
  };
}

function shootExecute(e) {
  const userChara = document.getElementById("character").value;
  const myAngle = Math.atan2(
    e.clientY - canvas.height / 2,
    e.clientX - canvas.width / 2
  );
  // Making const speed for light weapon
  let velocity = {
    x: Math.cos(myAngle) * 6,
    y: Math.sin(myAngle) * 6,
  };
  if (userChara == "Taketori") {
    velocity = {
      x: Math.cos(myAngle) * 8,
      y: Math.sin(myAngle) * 8,
    };
  }
  if (userChara == "Ayamado") {
    velocity = {
      x: Math.cos(myAngle) * 16,
      y: Math.sin(myAngle) * 16,
    };
  }
  // Adding light weapon in weapons array
  weapons.push(
    new Weapon(
      playerPosition.x, 
      playerPosition.y,
      6,
      "white",
      velocity,
      lightWeaponDamage
    )
  );
  if (upg_multishoot >= 1 && userChara == "Taketori") {
    const myAngle = Math.atan2(
      e.clientY - canvas.height / 2,
      e.clientX - canvas.width / 2
    );
    const velocity1 = {
      x: Math.cos(myAngle - 0.6) * 6,
      y: Math.sin(myAngle - 0.6) * 6,
    };
    weapons.push(
      new Weapon(
        playerPosition.x, 
        playerPosition.y,
        6,
        "white",
        velocity1,
        lightWeaponDamage
      )
    );
    const velocity2 = {
      x: Math.cos(myAngle + 0.6) * 6,
      y: Math.sin(myAngle + 0.6) * 6,
    };
    weapons.push(
      new Weapon(
        playerPosition.x, 
        playerPosition.y,
        6,
        "white",
        velocity2,
        lightWeaponDamage
      )
    );
  }
  if (upg_multishoot >= 2 && userChara == "Taketori") {
    const myAngle = Math.atan2(
      e.clientY - canvas.height / 2,
      e.clientX - canvas.width / 2
    );
    const velocity1 = {
      x: Math.cos(myAngle - 0.9) * 4,
      y: Math.sin(myAngle - 0.9) * 4,
    };
    weapons.push(
      new Weapon(
        playerPosition.x, 
        playerPosition.y,
        6,
        "white",
        velocity1,
        lightWeaponDamage
      )
    );
    const velocity2 = {
      x: Math.cos(myAngle + 0.9) * 4,
      y: Math.sin(myAngle + 0.9) * 4,
    };
    weapons.push(
      new Weapon(
        playerPosition.x, 
        playerPosition.y,
        6,
        "white",
        velocity2,
        lightWeaponDamage
      )
    );
  }
  if (upg_multishoot >= 3 && userChara == "Taketori") {
    const myAngle = Math.atan2(
      e.clientY - canvas.height / 2,
      e.clientX - canvas.width / 2
    );
    const velocity1 = {
      x: Math.cos(myAngle - 0.12) * 2,
      y: Math.sin(myAngle - 0.12) * 2,
    };
    weapons.push(
      new Weapon(
        playerPosition.x, 
        playerPosition.y,
        6,
        "white",
        velocity1,
        lightWeaponDamage
      )
    );
    const velocity2 = {
      x: Math.cos(myAngle + 0.12) * 2,
      y: Math.sin(myAngle + 0.12) * 2,
    };
    weapons.push(
      new Weapon(
        playerPosition.x, 
        playerPosition.y,
        6,
        "white",
        velocity2,
        lightWeaponDamage
      )
    );
  }
  if (upg_multishoot >= 1 && userChara == "Ayamado") {
    const myAngle = Math.atan2(
      e.clientY - canvas.height / 2,
      e.clientX - canvas.width / 2
    );
    for (let i = 0; i <= upg_multishoot * 3; i++) {
      const velocity1 = {
        x: Math.cos(myAngle) * (22 - 2*i),
        y: Math.sin(myAngle) * (22 - 2*i),
      };
      weapons.push(
        new Weapon(
          canvas.width / 2,
          canvas.height / 2,
          7 - i*0.25,
          "white",
          velocity1,
          lightWeaponDamage + 5 - i * 1.5
        )
      );
    };
  }
  if (upg_multishoot >= 1 && userChara == "Hakuyo") {
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
        playerPosition.x, 
        playerPosition.y,
        6,
        "white",
        velocity,
        lightWeaponDamage
      )
    );
  }
  if (upg_multishoot >= 2 && userChara == "Hakuyo") {
    const myAngle = Math.atan2(
      e.clientY - canvas.height / 2,
      e.clientX - canvas.width / 2
    );
    const velocity = {
      x: Math.cos(myAngle + 1.58) * 6,
      y: Math.sin(myAngle + 1.58) * 6,
    };
    weapons.push(
      new Weapon(
        playerPosition.x, 
        playerPosition.y,
        6,
        "white",
        velocity,
        lightWeaponDamage
      )
    );
    const velocity2 = {
      x: Math.cos(myAngle - 1.58) * 6,
      y: Math.sin(myAngle - 1.58) * 6,
    };
    weapons.push(
      new Weapon(
        playerPosition.x, 
        playerPosition.y,
        6,
        "white",
        velocity2,
        lightWeaponDamage
      )
    );
  }
  if (upg_multishoot >= 3 && userChara == "Hakuyo") {
    const myAngle = Math.atan2(
      e.clientY - canvas.height / 2,
      e.clientX - canvas.width / 2
    );
    const velocity = {
      x: Math.sin(myAngle) * 6 * 1.3,
      y: Math.cos(myAngle) * 6 * 1.3,
    };
    weapons.push(
      new Weapon(
        playerPosition.x, 
        playerPosition.y,
        3,
        "white",
        velocity,
        lightWeaponDamage - 5
      )
    );
    const velocity2 = {
      x: Math.sin(myAngle) * -6 * 1.3,
      y: Math.cos(myAngle) * -6 * 1.3,
    };
    weapons.push(
      new Weapon(
        playerPosition.x, 
        playerPosition.y,
        3,
        "white",
        velocity2,
        lightWeaponDamage - 5
      )
    );
  }
  for (let i = 0; i < upg_randbullet; i++) {
    if (Math.floor(Math.random() * 20) >= (19 - upg_randchance / 2)) {
      const myAngle = Math.floor(Math.random() * 360);
      if (userChara != "Ayamado") {
        const velocity = {
          x: Math.cos(myAngle) * 6,
          y: Math.sin(myAngle) * 6,
        };
        weapons.push(
          new Weapon(
            playerPosition.x, 
            playerPosition.y,
            6,
            "white",
            velocity,
            lightWeaponDamage
          )
        );
      }
      if (userChara == "Ayamado") {
        for (let i = 0; i < upg_multishoot + 1; i++) {
          const velocity2 = {
            x: Math.cos(myAngle) * (5.5 - 0.5*i),
            y: Math.sin(myAngle) * (5.5 - 0.5*i),
          };
          weapons.push(
            new Weapon(
              playerPosition.x, 
              playerPosition.y,
              3.5 - 0.5*i,
              "white",
              velocity2,
              5
            )
          );
        }
      }
    }
  }
}

function shootBullet(e) {
  const userChara = document.getElementById("character").value;
  if (shootCooldown <= 10 && userChara != "Ayamado") {
    if (shootCooldown >= 9.5) {
      shootCooldown += 2;
    }
    shootCooldown += 1;
    if (shootCooldown > 7) {
      bowoverload.classList.add("redout");
      bowoverloadbar.classList.add("redout");
    }
    if (shootCooldown > 9) {
      bowoverload.classList.add("exredout");
      bowoverloadbar.classList.add("exredout");
    }
    shootExecute(e);
  }
  if (shootCooldown <= 7 && userChara == "Ayamado") {
    if (shootCooldown == 7) {
      shootCooldown += 2;
    }
    shootCooldown += 1;
    if (shootCooldown > 4) {
      bowoverload.classList.add("redout");
      bowoverloadbar.classList.add("redout");
    }
    if (shootCooldown > 6) {
      bowoverload.classList.add("exredout");
      bowoverloadbar.classList.add("exredout");
    }
    shootExecute(e);
  }
};

canvas.addEventListener("contextmenu", (e) => {
  if (upg_rightmouse == true) {
    if (taketori_hisatsu > 0) {
      taketori_hisat(e);
      taketori_hisatsu -= 1;
      hisatsuCooldown -= 1;
    } else {
      shootBullet(e);
    }
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
    AZR_Timer += 0.01;
    AZR_Timer_slow += 0.005;
  }
}, 500);
window.setInterval(function () {
  if (document.hasFocus() && shootCooldown > 0 && shootCooldown > 8) {
    shootCooldown -= 1 + parseFloat((upg_bulletspeed / 8).toFixed(2));
    if (shootCooldown < 0) {
      shootCooldown = 0;
    }
  }
}, 500);
window.setInterval(function () {
  if (muteki >= 0) {
    muteki -= 1;
  }
}, 100);
window.setInterval(function () {
  const userChara = document.getElementById("character").value;
  if (document.hasFocus() && shootCooldown > 0 && shootCooldown <= 8 && userChara == "Hakuyo") {
    shootCooldown -= 1 + parseFloat((upg_bulletspeed / 12 - upg_multishoot / 6).toFixed(2));
    if (shootCooldown < 0) {
      shootCooldown = 0;
    }
    bowoverload.classList.remove("exredout");
    bowoverloadbar.classList.remove("exredout");
    if (shootCooldown <= 6) {
      bowoverload.classList.remove("redout");
      bowoverloadbar.classList.remove("redout");
    }
  }
  if (document.hasFocus() && shootCooldown > 0 && shootCooldown <= 8 && userChara == "Taketori") {
    shootCooldown -= 1 + parseFloat((upg_bulletspeed / 12 - upg_multishoot / 3.5).toFixed(2));
    if (shootCooldown < 0) {
      shootCooldown = 0;
    }
    bowoverload.classList.remove("exredout");
    bowoverloadbar.classList.remove("exredout");
    if (shootCooldown <= 6) {
      bowoverload.classList.remove("redout");
      bowoverloadbar.classList.remove("redout");
    }
  }
  if (document.hasFocus() && shootCooldown > 0 && shootCooldown <= 8 && userChara == "Ayamado") {
    shootCooldown -= 1 + parseFloat((upg_bulletspeed / 18 - upg_multishoot / 9).toFixed(2));
    if (shootCooldown < 0) {
      shootCooldown = 0;
    }
    if (shootCooldown <= 5) {
      bowoverload.classList.remove("exredout");
      bowoverloadbar.classList.remove("exredout");
    }
    if (shootCooldown <= 3) {
      bowoverload.classList.remove("redout");
      bowoverloadbar.classList.remove("redout");
    }
  }
}, 300);
window.setTimeout(function () {
  hisatsucharging();
}, 5000 - upg_charge * 1000);

function hisatsucharging() {
  const userChara = document.getElementById("character").value;
  if (document.hasFocus() && hisatsuCooldown < 5 && userChara == "Hakuyo") {
    hisatsuCooldown += 1;
    if (hisatsuCooldown == 5) {
      hisatsucharge.classList.add("hisatsufull");
    }
  }
  if (document.hasFocus() && hisatsuCooldown < 4 && userChara == "Taketori" && taketori_hisatsu <= 0) {
    hisatsuCooldown += 1;
    if (hisatsuCooldown == 4) {
      hisatsucharge.classList.add("hisatsufull");
    }
  }
  if (document.hasFocus() && hisatsuCooldown < 3 && userChara == "Ayamado") {
    hisatsuCooldown += 1;
    if (hisatsuCooldown == 3) {
      hisatsucharge.classList.add("hisatsufull");
    }
  }
  window.setTimeout(function () {
    hisatsucharging();
  }, 5000 - upg_charge * 300);
}

window.setInterval(function () {
  if (gamestart && !document.hasFocus() && gamePaused == false) {
    gamePaused = true;
    clearTimeout(timeout1);
    clearTimeout(timeout2);
    clearTimeout(timeout3);
    clearTimeout(timeout4);
    alert("暂停游戏中");
  }
  if (gamestart && document.hasFocus() && gamePaused == true) {
    gamePaused = false;
    timeout1 = setTimeout(spawnEnemy, 2000/(difficulty**0.3) - Math.min(1900, (AZR_Timer*7) ** 1.5));
    timeout2 = setTimeout(spawnEnemy2, 5400/(difficulty**0.25) - Math.min(3900, (AZR_Timer*7) ** 1.5));
    timeout3 = setTimeout(spawnEnemy3, 8800/(difficulty**0.25) - Math.min(5000, (AZR_Timer*7) ** 1.5));
    timeout4 = setTimeout(spawnEnemy4, 20000/(difficulty**0.25) - Math.min(5000, (AZR_Timer*7) ** 1.5));
  }
}, 200);


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
  if (event.keyCode === 52) {
    upgrade4pr();
  }
  if (event.keyCode === 53) {
    upgrade5pr();
  }
  if (event.keyCode === 54) {
    upgrade6pr();
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
  if (event.keyCode === 32) {
    hisatsu(event);
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
document.getElementById("upgrade4").addEventListener("click", function(event) {
  upgrade4pr();
});
document.getElementById("upgrade5").addEventListener("click", function(event) {
  upgrade5pr();
});
document.getElementById("upgrade6").addEventListener("click", function(event) {
  upgrade6pr();
});
document.getElementById("upgrade7").addEventListener("click", function(event) {
  upgrade7pr();
});
document.getElementById("hisatsuwaza").addEventListener("click", function(event) {
  hisatsu();
});

function upgrade1pr() {
  if (playerCoin >= 1000 && upg_bulletspeed == 9) {
    playerCoin -= 1000;
    upg_bulletspeed += 1;
    upgrade1.innerHTML = "数字1：升级射速 现LV10&nbsp&nbsp $？";
    upgrade1m.innerHTML = "箭速 ？";
  }
  if (playerCoin >= 1000 && upg_bulletspeed == 8) {
    playerCoin -= 1000;
    upg_bulletspeed += 1;
    upgrade1.innerHTML = "数字1：升级射速 现LV9&nbsp&nbsp $1000";
    upgrade1m.innerHTML = "箭速 1000";
  }
  if (playerCoin >= 1000 && upg_bulletspeed == 7) {
    playerCoin -= 1000;
    upg_bulletspeed += 1;
    upgrade1.innerHTML = "数字1：升级射速 现LV8&nbsp&nbsp $1000";
    upgrade1m.innerHTML = "箭速 1000";
  }
  if (playerCoin >= 1000 && upg_bulletspeed == 6) {
    playerCoin -= 1000;
    upg_bulletspeed += 1;
    upgrade1.innerHTML = "数字1：升级射速 现LV7&nbsp&nbsp $1000";
    upgrade1m.innerHTML = "箭速 1000";
  }
  if (playerCoin >= 800 && upg_bulletspeed == 5) {
    playerCoin -= 800;
    upg_bulletspeed += 1;
    upgrade1.innerHTML = "数字1：升级射速 现LV6&nbsp&nbsp $1000";
    upgrade1m.innerHTML = "箭速 1000";
  }
  if (playerCoin >= 500 && upg_bulletspeed == 4) {
    playerCoin -= 500;
    upg_bulletspeed += 1;
    upgrade1.innerHTML = "数字1：升级射速 现LV5&nbsp&nbsp $800";
    upgrade1m.innerHTML = "箭速 800";
  }
  if (playerCoin >= 200 && upg_bulletspeed == 3) {
    playerCoin -= 200;
    upg_bulletspeed += 1;
    upgrade1.innerHTML = "数字1：升级射速 现LV4&nbsp&nbsp $500";
    upgrade1m.innerHTML = "箭速 500";
  }
  if (playerCoin >= 100 && upg_bulletspeed == 2) {
    playerCoin -= 100;
    upg_bulletspeed += 1;
    upgrade1.innerHTML = "数字1：升级射速 现LV3&nbsp&nbsp $200";
    upgrade1m.innerHTML = "箭速 200";
  }
  if (playerCoin >= 60 && upg_bulletspeed == 1) {
    playerCoin -= 60;
    upg_bulletspeed += 1;
    upgrade1.innerHTML = "数字1：升级射速 现LV2&nbsp&nbsp $100";
    upgrade1m.innerHTML = "箭速 100";
  }
  if (playerCoin >= 30 && upg_bulletspeed == 0) {
    playerCoin -= 30;
    upg_bulletspeed += 1;
    upgrade1.innerHTML = "数字1：升级射速 现LV1&nbsp&nbsp $60";
    upgrade1m.innerHTML = "箭速 60";
  }
};
function upgrade2pr() {
  if (playerCoin >= 2000 && upg_randbullet == 7) {
    playerCoin -= 2000;
    upg_randbullet += 1;
    upgrade2.innerHTML = "数字2：箭矢散射 现LV&nbsp&nbsp $？";
    upgrade2m.innerHTML = "散射 ？";
  }
  if (playerCoin >= 2000 && upg_randbullet == 6) {
    playerCoin -= 2000;
    upg_randbullet += 1;
    upgrade2.innerHTML = "数字2：箭矢散射 现LV7&nbsp&nbsp $2000";
    upgrade2m.innerHTML = "散射 2000";
  }
  if (playerCoin >= 2000 && upg_randbullet == 5) {
    playerCoin -= 2000;
    upg_randbullet += 1;
    upgrade2.innerHTML = "数字2：箭矢散射 现LV6&nbsp&nbsp $2000";
    upgrade2m.innerHTML = "散射 2000";
  }
  if (playerCoin >= 1000 && upg_randbullet == 4) {
    playerCoin -= 1000;
    upg_randbullet += 1;
    upgrade2.innerHTML = "数字2：箭矢散射 现LV5&nbsp&nbsp $2000";
    upgrade2m.innerHTML = "散射 2000";
  }
  if (playerCoin >= 600 && upg_randbullet == 3) {
    playerCoin -= 600;
    upg_randbullet += 1;
    upgrade2.innerHTML = "数字2：箭矢散射 现LV4&nbsp&nbsp $1000";
    upgrade2m.innerHTML = "散射 1000";
  }
  if (playerCoin >= 300 && upg_randbullet == 2) {
    playerCoin -= 300;
    upg_randbullet += 1;
    upgrade2.innerHTML = "数字2：箭矢散射 现LV3&nbsp&nbsp $600";
    upgrade2m.innerHTML = "散射 600";
  }
  if (playerCoin >= 100 && upg_randbullet == 1) {
    playerCoin -= 100;
    upg_randbullet += 1;
    upgrade2.innerHTML = "数字2：箭矢散射 现LV2&nbsp&nbsp $300";
    upgrade2m.innerHTML = "散射 300";
  }
  if (playerCoin >= 30 && upg_randbullet == 0) {
    playerCoin -= 30;
    upg_randbullet += 1;
    upgrade2.innerHTML = "数字2：箭矢散射 现LV1&nbsp&nbsp $100";
    upgrade2m.innerHTML = "散射 100";
  }
}
function upgrade3pr() {
  if (playerCoin >= 1500 && upg_randchance == 6) {
    playerCoin -= 1500;
    upg_randchance += 1;
    upgrade3.innerHTML = "数字3：散箭概率 现LV7&nbsp&nbsp $？";
    upgrade3m.innerHTML = "散率 ？";
  }
  if (playerCoin >= 1000 && upg_randchance == 5) {
    playerCoin -= 1000;
    upg_randchance += 1;
    upgrade3.innerHTML = "数字3：散箭概率 现LV6&nbsp&nbsp $1500";
    upgrade3m.innerHTML = "散率 1500";
  }
  if (playerCoin >= 700 && upg_randchance == 4) {
    playerCoin -= 700;
    upg_randchance += 1;
    upgrade3.innerHTML = "数字3：散箭概率 现LV5&nbsp&nbsp $1000";
    upgrade3m.innerHTML = "散率 1000";
  }
  if (playerCoin >= 600 && upg_randchance == 3) {
    playerCoin -= 600;
    upg_randchance += 1;
    upgrade3.innerHTML = "数字3：散箭概率 现LV4&nbsp&nbsp $700";
    upgrade3m.innerHTML = "散率 700";
  }
  if (playerCoin >= 400 && upg_randchance == 2) {
    playerCoin -= 400;
    upg_randchance += 1;
    upgrade3.innerHTML = "数字3：散箭概率 现LV3&nbsp&nbsp $600";
    upgrade3m.innerHTML = "散率 600";
  }
  if (playerCoin >= 200 && upg_randchance == 1) {
    playerCoin -= 200;
    upg_randchance += 1;
    upgrade3.innerHTML = "数字3：散箭概率 现LV2&nbsp&nbsp $400";
    upgrade3m.innerHTML = "散率 400";
  }
  if (playerCoin >= 50 && upg_randchance == 0) {
    playerCoin -= 50;
    upg_randchance += 1;
    upgrade3.innerHTML = "数字3：散箭概率 现LV1&nbsp&nbsp $200";
    upgrade3m.innerHTML = "散率 200";
  }
}
function upgrade4pr() {
  if (playerCoin >= 1800 && upg_charge == 6) {
    playerCoin -= 1800;
    upg_charge += 1;
    upgrade4.innerHTML = "数字4：必杀充能 现LV7&nbsp&nbsp $？";
    upgrade4m.innerHTML = "充能 ？";
  }
  if (playerCoin >= 1300 && upg_charge == 5) {
    playerCoin -= 1300;
    upg_charge += 1;
    upgrade4.innerHTML = "数字4：必杀充能 现LV6&nbsp&nbsp $1800";
    upgrade4m.innerHTML = "充能 1800";
  }
  if (playerCoin >= 1000 && upg_charge == 4) {
    playerCoin -= 1000;
    upg_charge += 1;
    upgrade4.innerHTML = "数字4：必杀充能 现LV5&nbsp&nbsp $1300";
    upgrade4m.innerHTML = "充能 1300";
  }
  if (playerCoin >= 800 && upg_charge == 3) {
    playerCoin -= 800;
    upg_charge += 1;
    upgrade4.innerHTML = "数字4：必杀充能 现LV4&nbsp&nbsp $1000";
    upgrade4m.innerHTML = "充能 1000";
  }
  if (playerCoin >= 600 && upg_charge == 2) {
    playerCoin -= 600;
    upg_charge += 1;
    upgrade4.innerHTML = "数字4：必杀充能 现LV3&nbsp&nbsp $800";
    upgrade4m.innerHTML = "充能 800";
  }
  if (playerCoin >= 500 && upg_charge == 1) {
    playerCoin -= 500;
    upg_charge += 1;
    upgrade4.innerHTML = "数字4：必杀充能 现LV2&nbsp&nbsp $600";
    upgrade4m.innerHTML = "充能 600";
  }
  if (playerCoin >= 300 && upg_charge == 0) {
    playerCoin -= 300;
    upg_charge += 1;
    upgrade4.innerHTML = "数字4：必杀充能 现LV1&nbsp&nbsp $500";
    upgrade4m.innerHTML = "充能 500";
  }
}
function upgrade5pr() {
  if (playerCoin >= 5000 && upg_pierce == 3) {
    playerCoin -= 5000;
    upg_pierce += 1;
    upgrade5.innerHTML = "数字5：穿透箭击 现LV4&nbsp&nbsp $？";
    upgrade5m.innerHTML = "穿透 ？";
  }
  if (playerCoin >= 2500 && upg_pierce == 2) {
    playerCoin -= 2500;
    upg_pierce += 1;
    upgrade5.innerHTML = "数字5：穿透箭击 现LV3&nbsp&nbsp $5000";
    upgrade5m.innerHTML = "穿透 5000";
  }
  if (playerCoin >= 1000 && upg_pierce == 1) {
    playerCoin -= 1000;
    upg_pierce += 1;
    upgrade5.innerHTML = "数字5：穿透箭击 现LV2&nbsp&nbsp $2500";
    upgrade5m.innerHTML = "穿透 2500";
  }
  if (playerCoin >= 300 && upg_pierce == 0) {
    playerCoin -= 300;
    upg_pierce += 1;
    upgrade5.innerHTML = "数字5：穿透箭击 现LV1&nbsp&nbsp $1000";
    upgrade5m.innerHTML = "穿透 1000";
  }
}
function upgrade6pr() {
  if (playerCoin >= 2000 && upg_health == 3) {
    playerCoin -= 2000;
    upg_health += 1;
    health += 1;
    upgrade6.innerHTML = "数字6：生命上限 现LV4&nbsp&nbsp $？";
    upgrade6m.innerHTML = "生命 ？";
  }
  if (playerCoin >= 2000 && upg_health == 2) {
    playerCoin -= 2000;
    upg_health += 1;
    health += 1;
    upgrade6.innerHTML = "数字6：生命上限 现LV3&nbsp&nbsp $2000";
    upgrade6m.innerHTML = "生命 2000";
  }
  if (playerCoin >= 1000 && upg_health == 1) {
    playerCoin -= 1000;
    upg_health += 1;
    health += 1;
    upgrade6.innerHTML = "数字6：生命上限 现LV2&nbsp&nbsp $2000";
    upgrade6m.innerHTML = "生命 2000";
  }
  if (playerCoin >= 500 && upg_health == 0) {
    playerCoin -= 500;
    upg_health += 1;
    health += 1;
    upgrade6.innerHTML = "数字6：生命上限 现LV1&nbsp&nbsp $1000";
    upgrade6m.innerHTML = "生命 1000";
  }
}
function upgrade7pr() {
  if (playerCoin >= 2000 && upg_multishoot == 2) {
    playerCoin -= 2000;
    upg_multishoot += 1;
    upgrade7.innerHTML = "数字7：射击强化&nbsp&nbsp $？";
    upgrade7m.innerHTML = "多重 ？";
  }
  if (playerCoin >= 1000 && upg_multishoot == 1) {
    playerCoin -= 1000;
    upg_multishoot += 1;
    upgrade7.innerHTML = "数字7：射击强化&nbsp&nbsp $2000";
    upgrade7m.innerHTML = "多重 2000";
  }
  if (playerCoin >= 800 && upg_multishoot == 0) {
    playerCoin -= 800;
    upg_multishoot += 1;
    upgrade7.innerHTML = "数字7：射击强化&nbsp&nbsp $1000";
    upgrade7m.innerHTML = "多重 1000";
  }
}
function hisatsu() {
  const userChara = document.getElementById("character").value;
  if (hisatsuCooldown >= 5 && userChara == "Hakuyo") {
    hisatsuCooldown -= 5;
    hisatsucharge.classList.remove("hisatsufull");
    const myAngle = Math.random();
    for (let i = 0; i <= 31; i++) {
      const velocity1 = {
        x: Math.cos(myAngle - i*0.1) * 16,
        y: Math.sin(myAngle - i*0.1) * 16,
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
        x: Math.cos(myAngle + i*0.1) * 16,
        y: Math.sin(myAngle + i*0.1) * 16,
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
      if (upg_bulletspeed >= 3) {
        const velocity3 = {
          x: Math.cos(myAngle - i*0.1) * 8,
          y: Math.sin(myAngle - i*0.1) * 8,
        };
        weapons.push(
          new Weapon(
            canvas.width / 2,
            canvas.height / 2,
            3,
            "white",
            velocity3,
            5
          )
        );
        const velocity4 = {
          x: Math.cos(myAngle + i*0.1) * 8,
          y: Math.sin(myAngle + i*0.1) * 8,
        };
        weapons.push(
          new Weapon(
            canvas.width / 2,
            canvas.height / 2,
            3,
            "white",
            velocity4,
            5
          )
        );
      }
      if (upg_bulletspeed >= 6) {
        const velocity5 = {
          x: Math.cos(myAngle - i*0.1) * 12,
          y: Math.sin(myAngle - i*0.1) * 12,
        };
        weapons.push(
          new Weapon(
            canvas.width / 2,
            canvas.height / 2,
            3,
            "white",
            velocity5,
            5
          )
        );
        const velocity6 = {
          x: Math.cos(myAngle + i*0.1) * 12,
          y: Math.sin(myAngle + i*0.1) * 12,
        };
        weapons.push(
          new Weapon(
            canvas.width / 2,
            canvas.height / 2,
            3,
            "white",
            velocity6,
            5
          )
        );
      }
    };
  }
  if (hisatsuCooldown >= 3 && userChara == "Ayamado") {
    hisatsuCooldown -= 3;
    hisatsucharge.classList.remove("hisatsufull");
    let myAngle = Math.random();
    for (let j = 0; j <= 3 + upg_multishoot; j++) {
      myAngle = Math.floor(Math.random() * 360);
      for (let i = 0; i <= 26; i++) {
        const velocity = {
          x: Math.cos(myAngle) * (22 - 0.75*i),
          y: Math.sin(myAngle) * (22 - 0.75*i),
        };
        weapons.push(
          new Weapon(
            canvas.width / 2,
            canvas.height / 2,
            0.5 + i*0.125,
            "white",
            velocity,
            5
          )
        );
        const velocity2 = {
          x: Math.cos(myAngle) * -(22 - 0.75*i),
          y: Math.sin(myAngle) * -(22 - 0.75*i),
        };
        weapons.push(
          new Weapon(
            canvas.width / 2,
            canvas.height / 2,
            0.5 + i*0.125,
            "white",
            velocity2,
            5
          )
        );
      };
    };
  }
  if (hisatsuCooldown >= 4 && userChara == "Taketori") {
    hisatsuCooldown -= 4;
    hisatsucharge.classList.remove("hisatsufull");
    taketori_hisatsu = 4;
  }
}