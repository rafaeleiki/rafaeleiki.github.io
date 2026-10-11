'use client';

import { useEffect, useRef } from 'react';

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeNoise(seed) {
  const SIZE = 128;
  const grid = new Float32Array(SIZE * SIZE);
  let a = seed >>> 0;
  const rnd = () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = 0; i < SIZE * SIZE; i++) grid[i] = rnd();
  const at = (i, j) => grid[((j & (SIZE - 1)) * SIZE + (i & (SIZE - 1)))];
  const fade = (t) => t * t * (3 - 2 * t);
  return (x, y) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const u = fade(x - xi);
    const v = fade(y - yi);
    const a00 = at(xi, yi);
    const b10 = at(xi + 1, yi);
    const c01 = at(xi, yi + 1);
    const d11 = at(xi + 1, yi + 1);
    return a00 + (b10 - a00) * u + (c01 - a00) * v + (a00 - b10 - c01 + d11) * u * v;
  };
}

function hexToRgba(hex, a) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

function hexToRgbString(hex) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

// A seeded "nebula": soft gradient clouds + flow-field strands + a faint
// starfield, drawn once.
//
// IMPORTANT — this canvas spans the whole document, so its height is the page
// height (thousands of px), not the viewport. Two rules keep the page readable:
//
//   1. Cloud radius is derived from the canvas *width*, never the height.
//      Scaling by Math.max(w, h) produced ~2300px gradients that flooded the
//      entire page with mid-blue (#4c70bd), dropping body text to ~1.5:1.
//   2. Everything is drawn into an upper "cloud zone" and then faded back to
//      the ink base, so the content sections sit on a near-flat dark surface
//      while the hero keeps its atmosphere.
//
// If you change the alphas, re-run design-analysis/harness/contrast-pixel-sampling.mjs.
export default function GeneratedBackdrop({
  seed = 1,
  base = '#050509',
  colors = ['#7c6cff', '#2ee6c6', '#4c3fce'],
  nebula = 7,
  strands = 96,
  stars = 120,
  className = '',
  style,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const noise = makeNoise(seed);
    const rand = mulberry32(seed * 7 + 13);
    const baseRgb = hexToRgbString(base);
    let raf = 0;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth || 800;
      const h = canvas.clientHeight || 600;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);

      // Nebula lives in the top band only; the rest of the page stays ink.
      const cloudZone = Math.min(h, Math.max(680, w * 0.9));
      const radiusBase = Math.min(w, 1400);

      for (let i = 0; i < nebula; i++) {
        const x = rand() * w;
        const y = rand() * cloudZone;
        const r = (0.2 + rand() * 0.34) * radiusBase;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        const c = colors[i % colors.length];
        g.addColorStop(0, hexToRgba(c, 0.2));
        g.addColorStop(1, hexToRgba(c, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // flow strands, clipped to the cloud zone
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, w, cloudZone);
      ctx.clip();
      ctx.lineCap = 'round';
      for (let s = 0; s < strands; s++) {
        let x = rand() * w;
        let y = rand() * cloudZone;
        ctx.strokeStyle = colors[s % colors.length];
        ctx.globalAlpha = 0.05 + rand() * 0.1;
        ctx.lineWidth = 0.7 + rand() * 1.1;
        ctx.beginPath();
        ctx.moveTo(x, y);
        const len = 20 + Math.floor(rand() * 110);
        for (let i = 0; i < len; i++) {
          const n = noise(x * 0.0035, y * 0.0035);
          const ang = n * Math.PI * 2 * 2.2;
          x += Math.cos(ang) * 3;
          y += Math.sin(ang) * 3;
          if (x < 0 || x > w || y < 0 || y > cloudZone) break;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();
      ctx.globalAlpha = 1;

      // faint starfield — kept dim so no bright pixel can sit behind body copy
      for (let s = 0; s < stars; s++) {
        const x = rand() * w;
        const y = rand() * cloudZone;
        ctx.globalAlpha = 0.05 + rand() * 0.11;
        ctx.fillStyle = s % 3 === 0 ? '#ffffff' : colors[s % colors.length];
        ctx.beginPath();
        ctx.arc(x, y, 0.4 + rand() * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Fade the nebula back to the ink base so the reading surface is dark.
      const fade = ctx.createLinearGradient(0, 0, 0, Math.max(1, h));
      fade.addColorStop(0, `rgba(${baseRgb},0)`);
      fade.addColorStop(0.16, `rgba(${baseRgb},0.34)`);
      fade.addColorStop(0.34, `rgba(${baseRgb},0.72)`);
      fade.addColorStop(0.6, `rgba(${baseRgb},0.9)`);
      fade.addColorStop(1, `rgba(${baseRgb},0.95)`);
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, w, h);
    };

    draw();
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, base, nebula, strands, stars, colors.join(',')]);

  return <canvas ref={ref} className={className} style={style} aria-hidden="true" />;
}
