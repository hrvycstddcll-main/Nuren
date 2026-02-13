const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const askContainer = document.getElementById('ask-container');
const answerContainer = document.getElementById('answer-container');
const questionText = document.getElementById('questionText');
const mainGif = document.getElementById('mainGif');

const messages = [
    "Aray koooooo, joke lang yan di ba? 🥹🥹🥹",
    "Biiiiii namannnnn!!! 😭😭😭",
    "Ituuuuuuu sakit mooooo!!!",
    "Daaaaaaaaaaaaaaaa, nagbabanta na ako oh?!",
    "Pretty please babyy koooo? ❤️",
    "Di ka ba naawa sa akin?!"
];

const gifs = [
    "assets/mochi-mochimochi.gif",
    "assets/peach-and-goma-peach.gif",
    "assets/peach-goma-shake.gif",
    "assets/cute.gif",
    "assets/goma-peach.gif",
    "assets/crying.gif"
];

let messageIndex = 0;
let yesButtonSize = 18;

function moveButton() {
    const padding = 30;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding * 2;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding * 2;

    const randomX = Math.floor(Math.random() * maxX) + padding;
    const randomY = Math.floor(Math.random() * maxY) + padding;

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;

    questionText.innerText = messages[messageIndex];
    mainGif.src = gifs[messageIndex];

    yesButtonSize = Math.min(yesButtonSize + 5, 40);
    yesBtn.style.fontSize = `${yesButtonSize}px`;
    yesBtn.style.padding = `${yesButtonSize / 2}px ${yesButtonSize}px`;

    messageIndex = (messageIndex + 1) % messages.length;
}

const isTouch = 'ontouchstart' in window;

if (!isTouch) {
    noBtn.addEventListener('mouseover', moveButton);
}

noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});

yesBtn.addEventListener('click', () => {
    askContainer.classList.add('hidden');
    answerContainer.classList.remove('hidden');
    document.body.style.backgroundColor = "#CDE6B5";
    noBtn.classList.add('hidden');

    // ❤️ Redirect to album / letter page
    setTimeout(() => {
        window.location.href = "album.html"; 
        // change to your real album or letter link
    }, 3000);
});

//cursor
document.querySelectorAll("*").forEach(el => el.style.cursor = "none");

const cursor = document.getElementById("cursor");

const DOTS = 30;
const WIDTH = 16;
const IDLE_TIMEOUT = 150;

let mouse = { x: 0, y: 0 };
let dots = [];
let idle = false;
let timeout;

class Dot {
  constructor(index) {
    this.x = 0;
    this.y = 0;
    this.scale = 1 - index * 0.05;
    this.range = WIDTH / 2 - WIDTH / 2 * this.scale + 2;
    this.angleX = Math.random() * Math.PI * 2;
    this.angleY = Math.random() * Math.PI * 2;

    this.el = document.createElement("span");
    this.el.style.transform = `translate(-50%, -50%) scale(${this.scale})`;
    cursor.appendChild(this.el);
  }

  lock() {
    this.lockX = this.x;
    this.lockY = this.y;
  }

  draw(idle) {
    if (idle) {
      this.angleX += 0.05;
      this.angleY += 0.05;
      this.x = this.lockX + Math.sin(this.angleX) * this.range;
      this.y = this.lockY + Math.sin(this.angleY) * this.range;
    }
    this.el.style.left = this.x + "px";
    this.el.style.top = this.y + "px";
  }
}

function buildDots() {
  for (let i = 0; i < DOTS; i++) {
    dots.push(new Dot(i));
  }
}

function resetIdle() {
  idle = false;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    idle = true;
    dots.forEach(d => d.lock());
  }, IDLE_TIMEOUT);
}

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  resetIdle();
});

function animate() {
  let x = mouse.x;
  let y = mouse.y;

  dots.forEach((dot, i) => {
    dot.x = x;
    dot.y = y;
    dot.draw(idle);

    const next = dots[i + 1] || dots[0];
    x += (next.x - dot.x) * 0.35;
    y += (next.y - dot.y) * 0.35;
  });

  requestAnimationFrame(animate);
}

buildDots();
animate();

const cursorDots = cursor.querySelectorAll("span");

function cursorHoverIn(color = "#ee3d3d") {
  TweenMax.to(cursorDots, 0.3, {
    backgroundColor: color,
    ease: Power2.easeOut
  });
}

function cursorHoverOut() {
  TweenMax.to(cursorDots, 0.3, {
    backgroundColor: "white",
    ease: Power2.easeOut
  });
}