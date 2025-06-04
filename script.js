const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  const particles = [];

  for (let i = 0; i < 80; i++) {
    particles.push({
      x: x,
      y: y,
      radius: 2,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 5 + 2,
      alpha: 1
    });
  }

  fireworks.push(particles);
}

function updateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((particles, index) => {
    particles.forEach(p => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.alpha -= 0.01;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${hslToRgb(p.color)},${p.alpha})`;
      ctx.fill();
    });

    if (particles[0].alpha <= 0) {
      fireworks.splice(index, 1);
    }
  });

  requestAnimationFrame(updateFireworks);
}

function hslToRgb(hslColor) {
  // Create a temp div to get RGB values from HSL string
  const temp = document.createElement("div");
  temp.style.color = hslColor;
  document.body.appendChild(temp);
  const rgb = window.getComputedStyle(temp).color;
  document.body.removeChild(temp);
  return rgb.match(/\d+/g).slice(0, 3).join(',');
}

// Launch a new firework every second
setInterval(createFirework, 1000);
updateFireworks();
