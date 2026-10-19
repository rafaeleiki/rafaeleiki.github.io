'use client';

import { useEffect, useRef } from 'react';
import { mix } from '../lib/color';
import { mulberry32 } from '../lib/random';

const SAMPLE_WIDTH = 420;
const MAX_DPR = 1.5;
const MIDTONE_SPREAD = 1.35;
const JITTER = 0.3;
const MIN_RADIUS = 0.12;

export default function GeneratedPortrait({
  src,
  seed = 1,
  color = '#1d4ed8',
  color2 = null,
  background = '#f5f1ea',
  cell = 4,
  maxR = 1,
  className = '',
  style,
  alt = 'Portrait of Rafael Eiki',
}) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    const random = mulberry32(seed);
    const image = new Image();
    let disposed = false;
    image.src = src;

    image.onload = () => {
      if (disposed) return;

      const ratio = image.naturalHeight / image.naturalWidth;
      const sampleHeight = Math.max(1, Math.round(SAMPLE_WIDTH * ratio));
      const sample = document.createElement('canvas');
      sample.width = SAMPLE_WIDTH;
      sample.height = sampleHeight;
      const sampleCtx = sample.getContext('2d');
      sampleCtx.drawImage(image, 0, 0, SAMPLE_WIDTH, sampleHeight);

      let pixels;
      try {
        pixels = sampleCtx.getImageData(0, 0, SAMPLE_WIDTH, sampleHeight).data;
      } catch {
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const width = canvas.clientWidth || 300;
      const height = width * ratio;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, width, height);

      const columns = Math.floor(SAMPLE_WIDTH / cell);
      const rows = Math.floor(sampleHeight / cell);
      const dx = width / columns;
      const dy = height / rows;
      const step = Math.min(dx, dy) / 2;

      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const index = (row * cell * SAMPLE_WIDTH + column * cell) * 4;
          const luminance =
            (0.2126 * pixels[index] + 0.7152 * pixels[index + 1] + 0.0722 * pixels[index + 2]) / 255;
          const spread = Math.min(1, Math.max(0, (luminance - 0.5) * MIDTONE_SPREAD + 0.5));
          const radius = Math.max(0, (1 - spread) * step * maxR);
          if (radius < MIN_RADIUS) continue;

          const x = (column + 0.5 + (random() - 0.5) * JITTER) * dx;
          const y = (row + 0.5 + (random() - 0.5) * JITTER) * dy;
          ctx.fillStyle = color2 ? mix(color, color2, spread) : color;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    return () => {
      disposed = true;
    };
  }, [src, seed, color, color2, background, cell, maxR]);

  return (
    <canvas
      ref={ref}
      className={className}
      style={style}
      {...(alt ? { role: 'img', 'aria-label': alt } : { 'aria-hidden': 'true' })}
    />
  );
}
