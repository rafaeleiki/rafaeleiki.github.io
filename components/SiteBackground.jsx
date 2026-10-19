'use client';

import GeneratedBackdrop from './GeneratedBackdrop';
import useCursorGlow from './hooks/useCursorGlow';
import useMediaQuery, { FINE_POINTER, REDUCED_MOTION } from './hooks/useMediaQuery';
import useParticleField from './hooks/useParticleField';
import { BACKDROP_COLORS, CURSOR_GLOW, INK, SEED } from '../lib/tokens';

export default function SiteBackground() {
  const reduced = useMediaQuery(REDUCED_MOTION);
  const canHover = useMediaQuery(FINE_POINTER);
  const particleRef = useParticleField(!reduced);
  const glowRef = useCursorGlow(canHover && !reduced);

  return (
    <>
      <GeneratedBackdrop
        seed={SEED}
        base={INK}
        colors={BACKDROP_COLORS}
        className="absolute inset-0 z-0 h-full w-full"
      />
      {reduced ? null : (
        <canvas
          ref={particleRef}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 h-full w-full"
        />
      )}
      {canHover && !reduced ? (
        <div
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-0 h-[480px] w-[480px] rounded-full"
          style={{ background: CURSOR_GLOW, mixBlendMode: 'screen' }}
        />
      ) : null}
    </>
  );
}
