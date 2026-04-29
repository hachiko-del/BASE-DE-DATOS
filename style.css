/* ============================
   GALACTIC THEME - style.css
   ============================ */

@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;600;700&display=swap');

:root {
  --primary: #00f5ff;
  --secondary: #bf00ff;
  --dark-bg: #03001e;
  --glass-bg: rgba(5, 0, 40, 0.75);
  --glass-border: rgba(0, 245, 255, 0.2);
  --text-main: #ffffff;
  --text-muted: rgba(0, 245, 255, 0.6);
  --pink: #ff006e;
  --gold: #ffd700;
}

* {
  margin: 0; padding: 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

body {
  font-family: 'Rajdhani', sans-serif;
  background: var(--dark-bg);
  color: var(--text-main);
  overflow-x: hidden;
  min-height: 100vh;
  position: relative;
}

/* ---- STARFIELD CANVAS ---- */
#stars-canvas {
  position: fixed; top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 0; pointer-events: none;
}

/* ---- NEBULA BLOBS ---- */
.nebula {
  position: fixed; border-radius: 50%;
  filter: blur(90px); opacity: 0.15;
  pointer-events: none; z-index: 0;
}
.n1 {
  width: 650px; height: 650px;
  background: radial-gradient(#bf00ff, transparent);
  top: -150px; left: -200px;
  animation: nebFloat 14s ease-in-out infinite alternate;
}
.n2 {
  width: 500px; height: 500px;
  background: radial-gradient(#00f5ff, transparent);
  bottom: -100px; right: -150px;
  animation: nebFloat 18s ease-in-out infinite alternate-reverse;
}
.n3 {
  width: 400px; height: 400px;
  background: radial-gradient(#ff006e, transparent);
  top: 45%; left: 55%;
  animation: nebFloat 22s ease-in-out infinite alternate;
}
@keyframes nebFloat {
  0%   { transform: scale(1) translate(0,0); }
  100% { transform: scale(1.25) translate(40px,-40px); }
}

/* Keep old blob classes for compatibility */
.blob { display: none; }

/* ---- NAVBAR ---- */
header {
  position: fixed; top: 0; width: 100%;
  display: flex; justify-content: space-between; align-items: center;
  padding: 18px 6%;
  z-index: 1000;
  background: rgba(3, 0, 30, 0.85);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(0, 245, 255, 0.15);
}
header::after {
  content: '';
  position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--primary), var(--secondary), transparent);
  animation: headerLine 4s linear infinite;
}
@keyframes headerLine { 0%{opacity:0.4;} 50%{opacity:1;} 100%{opacity:0.4;} }

.logo-container { display: flex; align-items: center; gap: 12px; }
.logo { width: 40px; border-radius: 50%; border: 2px solid var(--primary); box-shadow: 0 0 12px rgba(0,245,255,0.4); }

.brand-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.3rem; font-weight: 900;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  letter-spacing: 2px;
}

nav { display: flex; align-items: center; gap: 22px; }

.nav-link {
  color: rgba(255,255,255,0.75);
  text-decoration: none; font-weight: 600;
  font-size: 0.95rem; letter-spacing: 1px;
  position: relative; transition: color 0.3s;
}
.nav-link::after {
  content: '';
  position: absolute; bottom: -4px; left: 0;
  width: 0; height: 1px;
  background: var(--primary);
  transition: width 0.3s;
}
.nav-link:hover { color: var(--primary); }
.nav-link:hover::after { width: 100%; }

/* ---- BUTTONS ---- */
.btn-login {
  background: transparent;
  color: var(--primary);
  border: 1px solid rgba(0,245,255,0.4);
  padding: 9px 20px; border-radius: 20px;
  cursor: pointer; font-weight: 700;
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.9rem; letter-spacing: 1px;
  transition: all 0.3s;
}
.btn-login:hover {
  background: rgba(0,245,255,0.12);
  border-color: var(--primary);
  box-shadow: 0 0 20px rgba(0,245,255,0.3);
  transform: translateY(-2px);
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: #000; border: none;
  padding: 13px 28px; border-radius: 10px;
  font-size: 1rem; font-weight: 700;
  font-family: 'Rajdhani', sans-serif;
  cursor: pointer; letter-spacing: 1px;
  position: relative; overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}
.btn-primary::before {
  content: '';
  position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
  transition: left 0.5s;
}
.btn-primary:hover::before { left: 150%; }
.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0,245,255,0.35);
}

.w-100 { width: 100%; }

/* ---- GLASS CARDS ---- */
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid var(--glass-border);
  border-radius: 18px;
  padding: 40px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,245,255,0.05);
  position: relative; overflow: hidden;
}
.glass-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--primary), transparent);
  opacity: 0.6;
}

/* ---- SECTIONS ---- */
.section {
  min-height: 100vh;
  padding: 120px 6% 80px;
  display: flex; flex-direction: column;
  justify-content: center; align-items: center;
  text-align: center;
  position: relative; z-index: 1;
}

/* ---- HERO ---- */
.hero h1 {
  font-family: 'Orbitron', sans-serif;
  font-size: 3rem; font-weight: 900;
  margin-bottom: 18px;
  background: linear-gradient(135deg, #fff 30%, var(--primary) 65%, var(--secondary));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  animation: heroGlow 4s ease-in-out infinite alternate;
  line-height: 1.2;
}
@keyframes heroGlow {
  0%   { filter: drop-shadow(0 0 10px rgba(0,245,255,0.3)); }
  100% { filter: drop-shadow(0 0 25px rgba(191,0,255,0.5)); }
}
.hero p {
  font-size: 1.15rem; color: var(--text-muted);
  margin-bottom: 30px; letter-spacing: 1px;
}

.highlight {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

/* ---- BADGES ---- */
.skills-badges {
  display: flex; flex-wrap: wrap; gap: 12px;
  justify-content: center; margin-bottom: 32px;
}
.badge {
  background: rgba(0,245,255,0.07);
  padding: 8px 18px; border-radius: 20px;
  border: 1px solid rgba(0,245,255,0.25);
  font-size: 0.9rem; font-weight: 600;
  color: rgba(255,255,255,0.85);
  transition: all 0.3s;
}
.badge:hover {
  background: rgba(0,245,255,0.15);
  border-color: var(--primary);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,245,255,0.2);
}

/* ---- SECTION TITLE ---- */
.section-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 2.2rem; font-weight: 900;
  margin-bottom: 45px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  letter-spacing: 3px;
}

/* ---- PROJECTS GRID ---- */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px; width: 100%; max-width: 1100px;
}

.project-card {
  text-align: left; padding: 28px;
  cursor: pointer;
  transition: transform 0.35s, box-shadow 0.35s, border-color 0.35s;
  position: relative; overflow: hidden;
}
.project-card::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(0,245,255,0.05), rgba(191,0,255,0.05));
  opacity: 0; transition: opacity 0.3s;
}
.project-card:hover {
  transform: translateY(-8px);
  border-color: var(--primary);
  box-shadow: 0 15px 40px rgba(0,245,255,0.2), 0 0 0 1px rgba(0,245,255,0.1);
}
.project-card:hover::after { opacity: 1; }

.project-icon { font-size: 2.8rem; margin-bottom: 14px; }
.project-card h3 {
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem; margin-bottom: 8px;
  color: var(--primary); letter-spacing: 1px;
}
.project-card p { color: rgba(255,255,255,0.6); font-size: 0.9rem; line-height: 1.5; }

/* ---- MODALS ---- */
.modal-overlay {
  position: fixed; top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(8px);
  display: flex; justify-content: center; align-items: center;
  z-index: 2000; opacity: 0; pointer-events: none;
  transition: opacity 0.35s;
}
.modal-overlay.active { opacity: 1; pointer-events: auto; }

.modal-content {
  width: 90%; max-width: 420px;
  transform: translateY(-40px) scale(0.97);
  transition: transform 0.35s;
}
.modal-overlay.active .modal-content {
  transform: translateY(0) scale(1);
}

.close-btn {
  position: absolute; top: 16px; right: 20px;
  font-size: 1.6rem; cursor: pointer;
  color: var(--text-muted); transition: color 0.3s, transform 0.3s;
  line-height: 1;
}
.close-btn:hover { color: var(--primary); transform: rotate(90deg); }

.modal-content h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem; margin-bottom: 8px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.modal-content p { color: var(--text-muted); margin-bottom: 20px; font-size: 0.9rem; }

/* ---- INPUTS ---- */
.input-group { margin-bottom: 16px; }
.input-group input,
.input-group textarea {
  width: 100%; padding: 13px 16px;
  border-radius: 10px;
  border: 1px solid rgba(0,245,255,0.2);
  background: rgba(0,0,0,0.4);
  color: #fff; outline: none;
  font-size: 0.95rem;
  font-family: 'Rajdhani', sans-serif;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.input-group textarea {
  min-height: 100px; resize: none;
  border-radius: 10px;
}
.input-group input:focus,
.input-group textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 15px rgba(0,245,255,0.2);
}

.error-msg { color: #ff4466; margin-bottom: 14px; font-size: 0.9rem; display: none; }

/* ---- FAB BUTTON ---- */
#sugerenciaFab {
  position: fixed; bottom: 24px; right: 24px;
  border-radius: 50%; width: 60px; height: 60px;
  font-size: 1.5rem; z-index: 1000;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border: none; color: #000; cursor: pointer;
  box-shadow: 0 0 25px rgba(0,245,255,0.5);
  transition: all 0.3s;
  animation: fabPulse 3s ease-in-out infinite;
}
#sugerenciaFab:hover {
  transform: scale(1.15);
  box-shadow: 0 0 40px rgba(0,245,255,0.7);
}
@keyframes fabPulse {
  0%,100% { box-shadow: 0 0 20px rgba(0,245,255,0.4); }
  50% { box-shadow: 0 0 40px rgba(191,0,255,0.6); }
}
