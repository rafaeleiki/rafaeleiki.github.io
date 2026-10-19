'use client';

import { useEffect, useRef } from 'react';
import { hexToRgb, rgba } from '../lib/color';
import { mulberry32 } from '../lib/random';
import { BACKDROP_COLORS, INK } from '../lib/tokens';

const NOISE_SIZE = 128;
const MAX_DPR = 1.5;

function makeNoise(seed) {
  const grid = new Float32Array(NOISE_SIZE * NOISE_SIZE);
  const random = mulberry32(seed);
  for (let index = 0; index < grid.length; index++) grid[index] = random();

  const valueAt = (x, y) => grid[(y & (NOISE_SIZE - 1)) * NOISE_SIZE + (x & (NOISE_SIZE - 1))];
  const fade = (t) => t * t * (3 - 2 * t);

  return (x, y) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const u = fade(x - xi);
    const v = fade(y - yi);
    const a = valueAt(xi, yi);
    const b = valueAt(xi + 1, yi);
    const c = valueAt(xi, yi + 1);
    const d = valueAt(xi + 1, yi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  };
}

const cloudZone = (width, height) => Math.min(height, Math.max(680, width * 0.9));

function drawClouds(ctx, { random, width, zone, palette, count }) {
  const radiusBase = Math.min(width, 1400);
  for (let index = 0; index < count; index++) {
    const x = random() * width;
    const y = random() * zone;
    const radius = (0.2 + random() * 0.34) * radiusBase;
    const color = palette[index % palette.length];
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, rgba(color, 0.2));
    gradient.addColorStop(1, rgba(color, 0));
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawStrands(ctx, { random, noise, width, zone, palette, count }) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, width, zone);
  ctx.clip();
  ctx.lineCap = 'round';

  for (let strand = 0; strand < count; strand++) {
    let x = random() * width;
    let y = random() * zone;
    ctx.strokeStyle = palette[strand % palette.length];
    ctx.globalAlpha = 0.05 + random() * 0.1;
    ctx.lineWidth = 0.7 + random() * 1.1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    const length = 20 + Math.floor(random() * 110);
    for (let step = 0; step < length; step++) {
      const angle = noise(x * 0.0035, y * 0.0035) * Math.PI * 2 * 2.2;
      x += Math.cos(angle) * 3;
      y += Math.sin(angle) * 3;
      if (x < 0 || x > width || y < 0 || y > zone) break;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  ctx.restore();
  ctx.globalAlpha = 1;
}

function drawStars(ctx, { random, width, zone, palette, count }) {
  for (let star = 0; star < count; star++) {
    const x = random() * width;
    const y = random() * zone;
    ctx.globalAlpha = 0.05 + random() * 0.11;
    ctx.fillStyle = star % 3 === 0 ? '#ffffff' : palette[star % palette.length];
    ctx.beginPath();
    ctx.arc(x, y, 0.4 + random() * 1.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function fadeToBase(ctx, { width, height, base }) {
  const [r, g, b] = hexToRgb(base);
  const fade = ctx.createLinearGradient(0, 0, 0, Math.max(1, height));
  fade.addColorStop(0, `rgba(${r},${g},${b},0)`);
  fade.addColorStop(0.16, `rgba(${r},${g},${b},0.34)`);
  fade.addColorStop(0.34, `rgba(${r},${g},${b},0.72)`);
  fade.addColorStop(0.6, `rgba(${r},${g},${b},0.9)`);
  fade.addColorStop(1, `rgba(${r},${g},${b},0.95)`);
  ctx.fillStyle = fade;
  ctx.fillRect(0, 0, width, height);
}

export default function GeneratedBackdrop({
  seed = 1,
  base = INK,
  colors = BACKDROP_COLORS,
  nebula = 7,
  strands = 96,
  stars = 120,
  className = '',
  style,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    const noise = makeNoise(seed);
    const random = mulberry32(seed * 7 + 13);
    let frame = 0;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const width = canvas.clientWidth || 800;
      const height = canvas.clientHeight || 600;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.fillStyle = base;
      ctx.fillRect(0, 0, width, height);

      const zone = cloudZone(width, height);
      drawClouds(ctx, { random, width, zone, palette: colors, count: nebula });
      drawStrands(ctx, { random, noise, width, zone, palette: colors, count: strands });
      drawStars(ctx, { random, width, zone, palette: colors, count: stars });
      fadeToBase(ctx, { width, height, base });
    };

    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frame);
    };
  }, [seed, base, colors, nebula, strands, stars]);

  return <canvas ref={ref} className={className} style={style} aria-hidden="true" />;
}
