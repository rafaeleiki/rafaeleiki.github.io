'use client';

import useInView from './hooks/useInView';

// Scroll-reveal wrapper. Fires once when the element enters the viewport.
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  y = 24,
  className = '',
  style,
  children,
  ...rest
}) {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : `translateY(${y}px)`,
        transition: `opacity 0.8s cubic-bezier(0.2, 0.6, 0.2, 1) ${delay}ms, transform 0.8s cubic-bezier(0.2, 0.6, 0.2, 1) ${delay}ms`,
        willChange: 'opacity, transform',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
