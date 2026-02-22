"use client";

import { useEffect, useRef, useState } from 'react';

const DEFAULT_OPTIONS = { threshold: 0 };

export default function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const opts = options || DEFAULT_OPTIONS;

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(el);
      }
    }, opts);

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return [ref, inView];
}
