const canvas = document.getElementById('asteroidCanvas');
 const ctx = canvas.getContext('2d');

 function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
 }

 setCanvasSize(); // Set initial canvas size

 const asteroids = [];
 const numAsteroids = 50; // Adjust the number of asteroids
 const asteroidColors = ['#888', '#999', '#777']; // Different shades of gray

 class Asteroid {
  constructor(x, y, radius, speedX, speedY, color) {
   this.x = x;
   this.y = y;
   this.radius = radius;
   this.speedX = speedX;
   this.speedY = speedY;
   this.color = color;
  }

  draw() {
   ctx.beginPath();
   ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
   ctx.fillStyle = this.color;
   ctx.fill();
   ctx.closePath();
  }

  update() {
   this.x += this.speedX;
   this.y += this.speedY;

   // Wrap around edges
   if (this.x + this.radius < 0) this.x = canvas.width + this.radius;
   if (this.x - this.radius > canvas.width) this.x = -this.radius;
   if (this.y + this.radius < 0) this.y = canvas.height + this.radius;
   if (this.y - this.radius > canvas.height) this.y = -this.radius;

   this.draw();
  }
 }

 function init() {
  for (let i = 0; i < numAsteroids; i++) {
   const radius = Math.random() * 10 + 3; // Random radius between 3 and 13
   const x = Math.random() * canvas.width;
   const y = Math.random() * canvas.height;
   const speedX = (Math.random() - 0.5) * 0.5; // Small random horizontal speed
   const speedY = (Math.random() - 0.5) * 0.5; // Small random vertical speed
   const color = asteroidColors[Math.floor(Math.random() * asteroidColors.length)];
   asteroids.push(new Asteroid(x, y, radius, speedX, speedY, color));
  }
 }

 function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  asteroids.forEach(asteroid => {
   asteroid.update();
  });
 }

 window.addEventListener('resize', () => {
  setCanvasSize();
 });

 init();
 animate();