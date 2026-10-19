'use client';

import { useEffect, useRef } from 'react';

const GLOW_OFFSET = 240;
const EASING = 0.08;

export default function useCursorGlow(enabled = true) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return undefined;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let frame = 0;

    const onMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const step = () => {
      x += (targetX - x) * EASING;
      y += (targetY - y) * EASING;
      element.style.transform = `translate(${x - GLOW_OFFSET}px, ${y - GLOW_OFFSET}px)`;
      frame = requestAnimationFrame(step);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    frame = requestAnimationFrame(step);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return ref;
}
