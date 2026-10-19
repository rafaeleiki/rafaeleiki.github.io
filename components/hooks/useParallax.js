'use client';

import { useEffect, useRef } from 'react';

const PARALLAX_SPEED = 0.12;

export default function useParallax(enabled = true) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return undefined;

    let frame = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = element.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * PARALLAX_SPEED;
      element.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return ref;
}
