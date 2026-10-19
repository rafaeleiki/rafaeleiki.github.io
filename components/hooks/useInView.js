'use client';

import { useEffect, useRef, useState } from 'react';

export default function useInView({ threshold = 0 } = {}) {
  const ref = useRef(null);
  const [state, setState] = useState({ inView: false, ready: false });

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setState({ inView: true, ready: true });
        observer.disconnect();
      } else {
        setState((current) => (current.ready ? current : { inView: false, ready: true }));
      }
    }, { threshold });

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, state.inView, state.ready];
}
