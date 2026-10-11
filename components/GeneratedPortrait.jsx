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

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mix(c1, c2, t) {
  const a = hexToRgb(c1);
  const b = hexToRgb(c2);
  return `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)},${Math.round(a[1] + (b[1] - a[1]) * t)},${Math.round(a[2] + (b[2] - a[2]) * t)})`;
}

// A seeded halftone "dot-matrix" self-portrait: dark ink dots on light paper.
// Single ink (or a smooth two-color ramp) keeps the face recognizable.
export default function GeneratedPortrait({
  src,
  seed = 1,
  color = '#1d4ed8',
  color2 = null,
  background = '#f5f1ea',
  cell = 4,
  maxR = 1.0,
  className = '',
  style,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rand = mulberry32(seed);
    const img = new Image();
    img.src = src;
    let disposed = false;

    img.onload = () => {
      if (disposed) return;
      const sampleW = 420;
      const ratio = img.naturalHeight / img.naturalWidth;
      const sampleH = Math.max(1, Math.round(sampleW * ratio));
      const off = document.createElement('canvas');
      off.width = sampleW;
      off.height = sampleH;
      const octx = off.getContext('2d');
      octx.drawImage(img, 0, 0, sampleW, sampleH);

      let data;
      try {
        data = octx.getImageData(0, 0, sampleW, sampleH).data;
      } catch (e) {
        return; // image unavailable
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth || 300;
      const h = w * ratio;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, w, h);

      const cols = Math.floor(sampleW / cell);
      const rows = Math.floor(sampleH / cell);
      const dx = w / cols;
      const dy = h / rows;
      const step = Math.min(dx, dy) / 2;

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const idx = ((j * cell) * sampleW + i * cell) * 4;
          const lum = (0.2126 * data[idx] + 0.7152 * data[idx + 1] + 0.0722 * data[idx + 2]) / 255;
          // spread midtones so facial structure stays legible
          const l = Math.min(1, Math.max(0, (lum - 0.5) * 1.35 + 0.5));
          const radius = Math.max(0, (1 - l) * step * maxR);
          if (radius < 0.12) continue;
          const jx = (i + 0.5 + (rand() - 0.5) * 0.3) * dx;
          const jy = (j + 0.5 + (rand() - 0.5) * 0.3) * dy;
          ctx.fillStyle = color2 ? mix(color, color2, l) : color;
          ctx.beginPath();
          ctx.arc(jx, jy, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    return () => {
      disposed = true;
    };
  }, [src, seed, color, color2, background, cell, maxR]);

  return <canvas ref={ref} className={className} style={style} role="img" aria-label="Generated portrait" />;
}
