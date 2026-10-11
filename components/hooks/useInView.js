"use client";

import { useEffect, useRef, useState } from 'react';

const DEFAULT_OPTIONS = { threshold: 0 };

// Returns [ref, inView, ready].
//
// `ready` is false until the IntersectionObserver has delivered its first
// callback. Consumers should not hide content before `ready` — otherwise an
// element that is already on screen at mount gets hidden for one frame and then
// faded back in (a visible flash).
export default function useInView(options) {
  const ref = useRef(null);
  const [state, setState] = useState({ inView: false, ready: false });
  const opts = options || DEFAULT_OPTIONS;

  useEffect(() => {
    const el = ref.current;
    if (!el || state.inView) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setState({ inView: true, ready: true });
        observer.unobserve(el);
      } else {
        setState((s) => (s.ready ? s : { ...s, ready: true }));
      }
    }, opts);

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.inView]);

  return [ref, state.inView, state.ready];
}
