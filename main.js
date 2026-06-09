/* ============================================================
   DESPENSA EL TOPO — Invitación Inauguración
   main.js
   ============================================================ */


/* ── PARTÍCULAS ── */

const canvas = document.getElementById('particles');
const ctx    = canvas.getContext('2d');
let W, H, particles;

function resizeCanvas() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function initParticles() {
  resizeCanvas();
  particles = Array.from({ length: 55 }, () => ({
    x:     Math.random() * W,
    y:     Math.random() * H,
    r:     Math.random() * 1.3 + 0.3,
    dx:    (Math.random() - 0.5) * 0.2,
    dy:    (Math.random() - 0.5) * 0.15,
    alpha: Math.random() * 0.3 + 0.04,
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, W, H);

  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(201, 168, 76, ${p.alpha})`;
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0) p.x = W;
    if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;
    if (p.y > H) p.y = 0;
  }

  requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', resizeCanvas);
initParticles();
drawParticles();


/* ── SINCRONIZAR LOGO EN EL MODAL ── */

const mainLogo  = document.querySelector('.logo-wrap img');
const modalLogo = document.getElementById('modal-logo');

if (mainLogo && modalLogo) {
  modalLogo.src = mainLogo.src;
}


/* ── MODAL ── */

const modal        = document.getElementById('modal');
const modalClose   = document.getElementById('modal-close');
const modalBackdrop = document.getElementById('modal-backdrop');

function openModal() {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Abrir al confirmar asistencia
document.querySelector('.cta').addEventListener('click', (e) => {
  e.preventDefault();
  openModal();
});

// Cerrar con botón, fondo o Escape
modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
