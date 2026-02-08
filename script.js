const pages = ['page1', 'page2', 'page3', 'page4'];

// ✅ ONE SONG FOR ENTIRE WEBSITE
const musicPath = "assets/music/song.mp3";

const audio = document.getElementById('bg-music');
const muteBtn = document.getElementById('mute-btn');

let musicStarted = false;
let heartsStarted = false;
let cardsGenerated = false;
let diaryTyped = false;

/* --------------------------
   Navigation
-------------------------- */
function showPage(index) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  document.getElementById(pages[index]).classList.add('active');
}

/* --------------------------
   Page 1: Countdown
-------------------------- */
function startCountdown() {
  const text = document.getElementById('countdown-text');
  let count = 1;

  const interval = setInterval(() => {
    if (count <= 3) {
      text.innerText = count;
      count++;
    } else {
      text.innerText = "HAPPY BIRTHDAY 🫀";
      document.getElementById('open-surprise').classList.remove('hidden');
      startFallingHearts();
      clearInterval(interval);
    }
  }, 1000);
}

/* --------------------------
   Open Surprise Button
-------------------------- */
document.getElementById('open-surprise').addEventListener('click', () => {
  musicStarted = true;

  // Start music ONCE
  audio.src = musicPath;
  audio.volume = 0.8;
  audio.play().catch(() => {});

  showPage(1);
});

/* --------------------------
   Page 2: Envelope
-------------------------- */
document.querySelector('.stamp').addEventListener('click', () => {
  document.querySelector('.envelope-wrapper').classList.add('open');
  document.querySelector('.letter').classList.remove('hidden');
});

document.getElementById('love-btn').addEventListener('click', () => {
  showPage(2);
});

/* --------------------------
   Page 3: Gift click
-------------------------- */
document.querySelector('.gift-box').addEventListener('click', () => {
  const giftBox = document.querySelector(".gift-box");
  const giftContainer = document.getElementById("gift-container");

  // Gift fade + scale down
  giftBox.style.transition = "0.6s ease";
  giftBox.style.transform = "scale(0.2)";
  giftBox.style.opacity = "0";

  // Show hanging gallery
  document.getElementById('hanging-gallery').classList.remove('hidden');

  // Generate cards ONCE
  if (!cardsGenerated) {
    generateHangingCards();
    cardsGenerated = true;
  }

  // Hide gift container after animation
  setTimeout(() => {
    giftContainer.classList.add("hidden");
  }, 650);
});

/* --------------------------
   Hanging Cards (20 photos)
-------------------------- */
const poetry = [
  "A moment caught in time...",
  "Your laugh is my favorite song.",
  "Quiet days, happy hearts.",
  "The world is better with you.",
  "Sunshine in human form.",
  "You make my heart feel safe.",
  "To many more adventures.",
  "Our silent understanding...",
  "Your smile fixes everything.",
  "Every photo holds a piece of love.",
  "You’re the warmth I never asked for, but needed.",
  "You are my favorite feeling.",
  "If comfort had a face, it would be yours.",
  "Sweet memories.",
  "You’re my sweetest forever friend.",
  "Your heart is my favorite place.",
  "Your eyes hold the kind of peace I’ve been searching for.",
  "Your strength inspires.",
  "You are love, in every form — all I need.",
  "The final piece... Happy Birthday, my sunshine."
];

function generateHangingCards() {
  const area = document.getElementById("hangingArea");
  area.innerHTML = "";

  for (let i = 1; i <= 24; i++) {
    const item = document.createElement("div");
    item.className = "hang-item";

    const stringLen = 120 + Math.floor(Math.random() * 120);


    const string = document.createElement("div");
    string.className = "hang-string";
    string.style.height = stringLen + "px";

    const card = document.createElement("div");
    card.className = "hang-card";
    card.style.animationDuration = (2.8 + Math.random() * 2.2) + "s";

    const img = document.createElement("img");
    img.src = `assets/images/photo${i}.jpg`;
    img.alt = `Memory ${i}`;

    // If image missing, remove card
    img.onerror = () => {
    img.style.display = "none";
   };


    const quote = document.createElement("div");
    quote.className = "hang-quote";
    // quote.textContent = poetry[i - 1] || "Always my favorite feeling.";
    quote.textContent = poetry[(i - 1) % poetry.length];

    card.appendChild(img);
    card.appendChild(quote);

    item.style.paddingTop = stringLen + "px";

    item.appendChild(string);
    item.appendChild(card);

    area.appendChild(item);
  }
}

/* --------------------------
   Open Diary Button -> Page4
-------------------------- */
document.getElementById("openDiaryBtn").addEventListener("click", () => {
  showPage(3);

  // Start typing only once
  if (!diaryTyped) {
    startTyping();
    diaryTyped = true;
  }
});

/* --------------------------
   Diary Typing Effect
-------------------------- */
const diaryText = `Dear Sunshine,

I don’t always know how to say things out loud…
so I’m writing it here, softly, like a secret.

You have this rare magic —
you make everything feel lighter without even trying.
And somehow… you became my safest place.

Your eyes are the only place I get lost
and still feel safe.

If my heart had a favorite sound,
it would be your laugh.

There are many laws in physics…
but I loves law of conservation of energy (u),
because no matter what happens,
my feelings for you never disappear —
they only change into more love.

Among all elements, my favorite will always be:
Vanadium (V)
Argon (Ar)
Sulfur (S)
Hydrogen (H)
Iodine (I)
— the one my heart chose.

Are you from space?
Because you’re my natural satellite…
always close,
always shining,
always pulling me back to you.

Song complete with lyrics,
Beat complete with tune,
I complete with you.

And honestly…
you’re my favorite distraction…
and I’m not even trying to focus.

If this world ever feels heavy,
please remember this:
you are love, in every form.

Happy Birthday, Sunshine.
You’ll always be my favorite Human forever. 💗`;


function startTyping() {
  const el = document.getElementById("diary-body");
  el.innerHTML = "";
  let i = 0;

  function type() {
    if (i < diaryText.length) {
      el.innerHTML += diaryText.charAt(i);
      i++;
      setTimeout(type, 45);
    } else {
      document.querySelector(".final-line").classList.remove("hidden");
    }
  }
  type();
}

/* --------------------------
   Falling Hearts
-------------------------- */
function startFallingHearts() {
  if (heartsStarted) return;
  heartsStarted = true;

  const container = document.getElementById("falling-hearts");

  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "fall-heart";
    heart.innerHTML = "&#10084;";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (16 + Math.random() * 20) + "px";
    heart.style.animationDuration = (4 + Math.random() * 4) + "s";

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 9000);
  }, 80);
}

/* --------------------------
   Start
-------------------------- */
window.onload = () => {
  startCountdown();
};

/* --------------------------
   Mute / Unmute
-------------------------- */
muteBtn.addEventListener('click', () => {
  audio.muted = !audio.muted;
  muteBtn.innerText = audio.muted ? '🔇' : '🔊';
});
