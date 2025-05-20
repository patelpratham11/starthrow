const form = document.getElementById('worry-form');
const input = document.getElementById('worry-input');
const container = document.getElementById('stars-container');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const fullText = input.value.trim();
  if (!fullText) return;

  input.value = '';

  // Step 1: Create and animate the full sentence
  const fullSentence = document.createElement('div');
  fullSentence.className = 'shooting-star';
  fullSentence.textContent = fullText;

  const words = fullText.split(/\s+/);

  const startY = Math.random() * 60 + 20;
  fullSentence.style.top = `${startY}%`;
  fullSentence.style.left = '0';

  // Random fly-out direction: constrained left-to-right and mild upward
  const distanceX = Math.random() * 200 + 250;   // 250px to 450px → always rightward
  const distanceY = -(Math.random() * 80);       // 0 to -80px → gentle upward slope
  const rotate = Math.random() * 40 - 20;        // -20° to +20° tilt

  fullSentence.style.setProperty('--translateX', `${distanceX}px`);
  fullSentence.style.setProperty('--translateY', `${distanceY}px`);
  fullSentence.style.setProperty('--rotate', `${rotate}deg`);
  

  container.appendChild(fullSentence);

  // If more than 2 words, break apart after animation
  if (words.length > 2) {
    fullSentence.style.animation = 'flyAcross 1s ease-out forwards';

    setTimeout(() => {
        const sentenceRect = fullSentence.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // Use center instead of left edge
        const spawnLeft = (sentenceRect.left - containerRect.left) + sentenceRect.width / 2;
        const spawnTop = (sentenceRect.top - containerRect.top) + sentenceRect.height / 2;

        fullSentence.remove();

        words.forEach((chunk, index) => {
            setTimeout(() => {
            createShootingStar(chunk, spawnLeft, spawnTop);
            }, index);
        });
    }, 1000);
  } else {
    fullSentence.style.animation = 'flyCustom 2s ease-out forwards';
    // If 2 words or fewer, just remove after animation without chunking
    setTimeout(() => {
      fullSentence.remove();
    }, 1000);
  }
});

function createShootingStar(text, left, top) {
  const star = document.createElement('div');
  star.className = 'shooting-star';
  star.textContent = text;

  // Start at position where full sentence ended
  star.style.position = 'absolute';
  star.style.left = `${left}px`;
  star.style.top = `${top}px`;

  // Random fly-out direction
  const distanceX = Math.random() * 600 - 300; // -300 to +300 px
  const distanceY = -(Math.random() * 300 + 100); // upward -100 to -400 px
  const rotate = Math.random() * 60 - 30;

  star.style.setProperty('--translateX', `${distanceX}px`);
  star.style.setProperty('--translateY', `${distanceY}px`);
  star.style.setProperty('--rotate', `${rotate}deg`);
  star.style.animation = 'flyCustom 1.8s ease-out forwards';

  container.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 2000);
}

const starContainer = document.getElementById('stars-container');
const numStars = 150; // how many stars you want

for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    // Random position: X across full width, Y in top half (0% to 50% of viewport height)
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight / 2);

    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    // Optional: randomize animation duration and delay for more natural twinkle
    star.style.animationDuration = `${2 + Math.random() * 3}s`;
    star.style.animationDelay = `${Math.random() * 3}s`;

    starContainer.appendChild(star);
}