const form = document.getElementById('worry-form');
const input = document.getElementById('worry-input');
const container = document.getElementById('stars-container');

// // ✨ Add twinkling stars all over screen
// function generateStars() {
//   const numStars = 150;
//   container.innerHTML = ''; // clear existing

//   for (let i = 0; i < numStars; i++) {
//     const star = document.createElement('div');
//     star.classList.add('star');

//     const x = Math.random() * 100; // % of container width
//     const y = Math.random() * 50;  // % of container height (top half)

//     star.style.left = `${x}%`;
//     star.style.top = `${y}%`;

//     star.style.animationDuration = `${2 + Math.random() * 3}s`;
//     star.style.animationDelay = `${Math.random() * 3}s`;

//     container.appendChild(star);
//   }
// }

// generateStars();
// window.addEventListener('resize', generateStars); // redraw on resize

const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const stars = [];
  const numStars = 150;

  // Initialize stars with random position and flicker params
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height / 2, // stars in top half
      radius: Math.random() * 1.5 + 0.5,
      flicker: Math.random() * 0.01 + 0.002,
      alpha: Math.random(),
      direction: Math.random() > 0.5 ? 1 : -1,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
      // Flicker animation
      star.alpha += star.flicker * star.direction;
      if (star.alpha <= 0.2 || star.alpha >= 1) star.direction *= -1;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha.toFixed(2)})`;
      ctx.shadowColor = `rgba(255, 255, 255, ${star.alpha.toFixed(2)})`;
      ctx.shadowBlur = 3;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();

// ✨ Launching worry sentences
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const fullText = input.value.trim();
  if (!fullText) return;
  input.value = '';

  const fullSentence = document.createElement('div');
  fullSentence.className = 'shooting-star';
  fullSentence.textContent = fullText;

  const words = fullText.split(/\s+/);
  const startY = Math.random() * 60 + 20;

  fullSentence.style.top = `${startY}%`;
  fullSentence.style.left = '0%';

  const distanceX = Math.random() * 5 + 10; // 10vw to 15vw
  const distanceY = -(Math.random() * 35);     // 0% to -8%
  const rotate = Math.random() * 40 - 20;

  fullSentence.style.setProperty('--translateX', `${distanceX}vw`);
  fullSentence.style.setProperty('--translateY', `${distanceY}vh`);
  fullSentence.style.setProperty('--rotate', `${rotate}deg`);

  container.appendChild(fullSentence);

  if (words.length > 2) {
    fullSentence.style.animation = 'flyAcross 1s ease-out forwards';

    setTimeout(() => {
      const rect = fullSentence.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const spawnLeftPercent = ((rect.left - containerRect.left) + rect.width / 2) / container.offsetWidth * 100;
      const spawnTopPercent = ((rect.top - containerRect.top) + rect.height / 2) / container.offsetHeight * 100;
      const clampedLeft = Math.min(Math.max(spawnLeftPercent, 10), 90); // limit to 10%–90%

      fullSentence.remove();

      words.forEach((chunk, index) => {
        setTimeout(() => {
          createShootingStar(chunk, clampedLeft, spawnTopPercent);
        }, index * 50);
      });
    }, 1000);
  } else {
    fullSentence.style.animation = 'flyCustom 2s ease-out forwards';
    setTimeout(() => fullSentence.remove(), 1000);
  }
});

// ✨ Break into word-stars
function createShootingStar(text, leftPercent, topPercent) {
  const star = document.createElement('div');
  star.className = 'shooting-star';
  star.textContent = text;

  star.style.position = 'absolute';
  star.style.left = `${leftPercent}%`;
  star.style.top = `${topPercent}%`;

  const distanceX = Math.random() * 60 - 30; // -30vw to +30vw
  const distanceY = -(Math.random() * 30 + 10); // -10vh to -40vh
  const rotate = Math.random() * 60 - 30;

  star.style.setProperty('--translateX', `${distanceX}vw`);
  star.style.setProperty('--translateY', `${distanceY}vh`);
  star.style.setProperty('--rotate', `${rotate}deg`);

  star.style.animation = 'flyCustom 1.8s ease-out forwards';
  container.appendChild(star);

  setTimeout(() => star.remove(), 2000);
}
