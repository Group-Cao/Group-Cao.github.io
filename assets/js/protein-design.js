// Illustrative geometry for the Cao Group website; not a molecular simulation.
const TAU = Math.PI * 2;
const mix = (a, b, t) => a + (b - a) * t;
const ease = (a, b, x) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function createBackbone() {
  const points = [];
  const centers = [[-39, -17], [39, -17], [0, 45]];
  const count = 144;
  for (let helix = 0; helix < 3; helix += 1) {
    const next = [];
    for (let i = 0; i < count; i += 1) {
      const u = i / (count - 1);
      const angle = u * TAU * 5.5 + helix * 1.35;
      const y = (helix === 1 ? 1 - u : u) * 146 - 73;
      next.push({
        x: centers[helix][0] + 19 * Math.cos(angle) + y * (helix - 1) * 0.065,
        y,
        z: centers[helix][1] + 19 * Math.sin(angle),
        wx: Math.cos(angle) * 0.28, wy: 0.96, wz: Math.sin(angle) * 0.28,
        nx: Math.cos(angle), nz: Math.sin(angle), width: 7.2, helix
      });
    }
    if (points.length) {
      const from = points[points.length - 1];
      const to = next[0];
      const arch = helix === 1 ? 34 : -34;
      for (let i = 1; i < 16; i += 1) {
        const u = i / 16;
        points.push({
          x: mix(from.x, to.x, u),
          y: mix(from.y, to.y, u) + Math.sin(Math.PI * u) * arch,
          z: mix(from.z, to.z, u) - Math.sin(Math.PI * u) * 12,
          wx: 0.25, wy: 0.9, wz: 0.35,
          nx: 0.2, nz: 0.8, width: 2.2, helix: -1
        });
      }
    }
    points.push(...next);
  }
  return points;
}

const backbone = createBackbone();

export function proteinFrame(seconds, width, height) {
  const phase = ((seconds % 20) + 20) % 20;
  const folded = ease(3.2, 9, phase);
  const opacity = ease(0, 1.1, phase) * (1 - ease(18.5, 20, phase));
  const stage = phase < 4 ? 0 : phase < 10 ? 1 : 2;
  const rotation = seconds * 0.15 + 0.58;
  const scale = Math.min(width / 320, height / 248);
  const project = (x, y, z) => {
    const rx = x * Math.cos(rotation) + z * Math.sin(rotation);
    const rz = -x * Math.sin(rotation) + z * Math.cos(rotation);
    const ry = y * Math.cos(-0.16) - rz * Math.sin(-0.16);
    const depth = y * Math.sin(-0.16) + rz * Math.cos(-0.16);
    const x2 = rx * Math.cos(-0.18) - ry * Math.sin(-0.18);
    const y2 = rx * Math.sin(-0.18) + ry * Math.cos(-0.18);
    const perspective = 680 / (680 + depth);
    return { x: width * 0.52 + x2 * scale * perspective,
      y: height * 0.49 + y2 * scale * perspective, z: depth };
  };
  const points = backbone.map((p, i) => {
    const u = i / (backbone.length - 1);
    const shake = (1 - folded) * 5;
    const x = mix((u - 0.5) * 246, p.x, folded);
    const y = mix(23 * Math.sin(u * TAU * 2 + seconds * 0.5), p.y, folded)
      + shake * Math.sin(u * 27 + seconds);
    const z = mix(24 * Math.cos(u * TAU * 2), p.z, folded);
    const ribbonWidth = p.width * folded;
    return { ...project(x, y, z), helix: p.helix,
      left: project(x - p.wx * ribbonWidth, y - p.wy * ribbonWidth, z - p.wz * ribbonWidth),
      right: project(x + p.wx * ribbonWidth, y + p.wy * ribbonWidth, z + p.wz * ribbonWidth),
      light: p.nx * Math.sin(rotation + 0.5) + p.nz * Math.cos(rotation + 0.5) };
  });
  const panels = points.slice(0, -1).map((p, i) => {
    const q = points[i + 1];
    const light = (p.light + 1) / 2;
    const hue = p.helix === 1 ? 200 : p.helix === 2 ? 176 : 186;
    return { vertices: [p.left, q.left, q.right, p.right], z: (p.z + q.z) / 2,
      fill: `hsl(${hue}, ${p.helix < 0 ? 57 : 85}%, ${mix(19, 70, light)}%)` };
  }).sort((a, b) => b.z - a.z);
  return { points, panels, phase, stage, folded, opacity, scale, project };
}

export function drawProtein(ctx, width, height, seconds) {
  const frame = proteinFrame(seconds, width, height);
  const { points, panels, phase, folded, opacity, scale, project } = frame;
  ctx.clearRect(0, 0, width, height);
  const halo = ctx.createRadialGradient(width * 0.52, height * 0.48, 2,
    width * 0.52, height * 0.48, height * 0.7);
  halo.addColorStop(0, 'rgba(21, 133, 172, 0.18)');
  halo.addColorStop(1, 'rgba(4, 15, 37, 0)');
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, width, height);
  // Sparse graph nodes suggest a generative search around the designed backbone.
  for (let i = 0; i < 25; i += 1) {
    const angle = i * 2.39996 + seconds * 0.045;
    const radius = 96 + 17 * Math.sin(i * 3.1);
    const p = project(Math.cos(angle) * radius,
      Math.sin(angle) * 92, Math.cos(i * 1.7) * 48);
    const alpha = 0.17 + 0.13 * Math.sin(seconds * 0.7 + i) ** 2;
    ctx.fillStyle = `rgba(96, 211, 234, ${alpha})`;
    ctx.beginPath(); ctx.arc(p.x, p.y, 1.1 * scale, 0, TAU); ctx.fill();
    if (i % 3 === 0) {
      const q = points[(i * 29) % points.length];
      ctx.strokeStyle = `rgba(85, 198, 225, ${0.025 + (1 - folded) * 0.045})`;
      ctx.lineWidth = 0.6;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
    }
  }
  ctx.save();
  ctx.globalAlpha = opacity;
  if (folded > 0.01) {
    ctx.lineJoin = 'round';
    for (const panel of panels) {
      ctx.beginPath();
      panel.vertices.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
      ctx.closePath();
      ctx.fillStyle = panel.fill;
      ctx.fill();
      ctx.strokeStyle = panel.fill;
      ctx.lineWidth = 0.7;
      ctx.stroke();
    }
  }
  ctx.beginPath();
  points.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
  ctx.lineWidth = mix(1.7, 0.65, folded) * scale;
  ctx.strokeStyle = `rgba(131, 239, 245, ${mix(0.78, 0.18, folded)})`;
  ctx.stroke();
  const traveling = phase * 0.065;
  for (let i = 0; i < points.length; i += 8) {
    const p = points[i];
    const u = i / points.length;
    const pulse = Math.max(0, 1 - Math.abs(((u - traveling) % 1 + 1) % 1 - 0.5) * 24);
    const gold = folded > 0.8 && i % 56 === 0;
    ctx.fillStyle = gold ? '#f8c66a' : `rgba(135, 237, 247, ${mix(0.85, 0.22, folded) + pulse * 0.6})`;
    ctx.shadowColor = gold ? '#eeaa3f' : '#39dcee';
    ctx.shadowBlur = gold ? 10 : 3;
    ctx.beginPath();
    ctx.arc(p.x, p.y, (gold ? 2.3 : mix(2.3, 1, folded) + pulse) * scale, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
  return frame;
}

function initializeProteinDesign(root) {
  const canvas = root.querySelector('[data-protein-canvas]');
  const ctx = canvas?.getContext('2d');
  if (!ctx) return;
  const toggle = root.querySelector('[data-protein-toggle]');
  const progress = root.querySelector('[data-protein-progress]');
  const stages = [...root.querySelectorAll('[data-protein-stage]')];
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused = false;
  let userEnabledMotion = false;
  let visible = false;
  let elapsed = 0;
  let previousTime = 0;
  let lastDraw = -Infinity;
  let frameId = 0;
  let width = 0;
  let height = 0;
  let currentStage = -1;
  const paused = () => userPaused || (preference.matches && !userEnabledMotion);
  const canRun = () => !paused() && visible && !document.hidden && width > 0;
  function render(time) {
    if (!width || !height) return;
    const frame = drawProtein(ctx, width, height, time);
    if (frame.stage !== currentStage) {
      stages.forEach((stage, i) => i === frame.stage
        ? stage.setAttribute('aria-current', 'step') : stage.removeAttribute('aria-current'));
      currentStage = frame.stage;
    }
    progress.style.transform = `scaleX(${frame.phase / 20})`;
    root.classList.add('is-ready');
  }
  function tick(now) {
    frameId = 0;
    if (!canRun()) { previousTime = 0; return; }
    if (previousTime) elapsed += Math.min(100, now - previousTime) / 1000;
    previousTime = now;
    if (now - lastDraw >= 1000 / 30) { render(elapsed); lastDraw = now; }
    frameId = requestAnimationFrame(tick);
  }
  function synchronize() {
    toggle.textContent = paused() ? 'Play' : 'Pause';
    toggle.setAttribute('aria-label', paused() ? 'Play animation' : 'Pause animation');
    toggle.setAttribute('aria-pressed', String(paused()));
    if (canRun() && !frameId) {
      previousTime = 0;
      frameId = requestAnimationFrame(tick);
    } else if (!canRun() && frameId) {
      cancelAnimationFrame(frameId);
      frameId = 0;
      previousTime = 0;
    }
  }
  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = Math.round(rect.width);
    height = Math.round(rect.height);
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    render(preference.matches && !userEnabledMotion || !elapsed ? 14 : elapsed);
    synchronize();
  }
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    if (paused()) { userPaused = false; userEnabledMotion = true; }
    else userPaused = true;
    synchronize();
  });
  preference.addEventListener('change', () => {
    userEnabledMotion = false;
    if (preference.matches) render(14);
    synchronize();
  });
  document.addEventListener('visibilitychange', synchronize);
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    synchronize();
  }, { rootMargin: '80px 0px', threshold: 0.01 }).observe(root);
  resize();
}

if (typeof document !== 'undefined') {
  document.querySelectorAll('[data-protein-design]').forEach(initializeProteinDesign);
}
