'use client';

import { useEffect, useRef } from 'react';
import { mulberry32 } from '../../lib/random';
import { ACCENT, ACCENT_2, SEED } from '../../lib/tokens';

const PARTICLE_COUNT = 34;
const MAX_DPR = 1.5;
const DRIFT = 0.12;

export default function useParticleField(enabled = true) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !enabled) return undefined;

    const ctx = canvas.getContext('2d');
    const random = mulberry32(SEED);
    let width = 0;
    let height = 0;
    let frame = 0;
    let particles = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: random() * width,
        y: random() * height,
        vx: (random() - 0.5) * DRIFT,
        vy: (random() - 0.5) * DRIFT,
        radius: 0.6 + random() * 1.6,
        alpha: 0.05 + random() * 0.14,
        color: random() > 0.5 ? ACCENT : ACCENT_2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;
        ctx.beginPath();
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      frame = requestAnimationFrame(loop);
      draw();
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const onResize = () => {
      resize();
      init();
    };

    const onVisibilityChange = () => (document.hidden ? stop() : start());

    resize();
    init();
    start();

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden) start();
      else stop();
    }, { threshold: 0 });
    observer.observe(canvas);

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('resize', onResize);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', onResize);
    };
  }, [enabled]);

  return ref;
}
