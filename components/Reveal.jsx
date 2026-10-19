'use client';

import useHydrated from './hooks/useHydrated';
import useInView from './hooks/useInView';
import useMediaQuery, { REDUCED_MOTION } from './hooks/useMediaQuery';

export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  y = 24,
  className = '',
  style,
  children,
  ...rest
}) {
  const [ref, inView, ready] = useInView({ threshold: 0.15 });
  const hydrated = useHydrated();
  const reduced = useMediaQuery(REDUCED_MOTION);

  const hidden = hydrated && ready && !inView && !reduced;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? `translateY(${y}px)` : 'none',
        transition: hidden
          ? `opacity 0.8s cubic-bezier(0.2, 0.6, 0.2, 1) ${delay}ms, transform 0.8s cubic-bezier(0.2, 0.6, 0.2, 1) ${delay}ms`
          : 'none',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
