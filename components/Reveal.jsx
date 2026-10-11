'use client';

import useHydrated from './hooks/useHydrated';
import useMediaQuery from './hooks/useMediaQuery';
import useInView from './hooks/useInView';

// Scroll-reveal wrapper. Fires once when the element enters the viewport.
//
// Progressive enhancement: the element renders *visible* and only opts into the
// hidden/offset state after mount. Without this, every wrapped block shipped
// `style="opacity:0"` in the static HTML — so with JS disabled (or a failed
// bundle) the metrics, all six work entries, research, ownership and the closing
// CTA were invisible.
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
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  // Only hide once the observer has reported AND the element is out of view.
  // Gating on `ready` avoids hiding something that is already on screen.
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
