'use client';

import GeneratedPortrait from './GeneratedPortrait';
import SignalDot from './SignalDot';
import useMediaQuery, { DESKTOP_UP, REDUCED_MOTION } from './hooks/useMediaQuery';
import useParallax from './hooks/useParallax';
import {
  ACCENT,
  ACCENT_2,
  ACCENT_DEEP,
  ACCENT_GRADIENT,
  MONOGRAM_STROKE,
  PORTRAIT_BACKGROUND,
  SCANLINE_GRADIENT,
  SEED,
} from '../lib/tokens';

export default function Hero({ t }) {
  const reduced = useMediaQuery(REDUCED_MOTION);
  const showPortrait = useMediaQuery(DESKTOP_UP);
  const parallaxRef = useParallax(!reduced);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[88svh] flex-col justify-center overflow-hidden py-16"
    >
      <div
        ref={parallaxRef}
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-10 select-none text-[40vw] font-bold leading-none md:text-[26rem]"
        style={{ color: 'transparent', WebkitTextStroke: `1px ${MONOGRAM_STROKE}` }}
      >
        {t.monogram}
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden">
        <div
          className="absolute inset-x-0 h-16"
          style={{ background: SCANLINE_GRADIENT, animation: 'proto-scan 7s linear infinite' }}
        />
      </div>

      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
        {t.ui.eyebrow} <span className="text-accent-2" aria-hidden="true">{'//'}</span>
        <span
          aria-hidden="true"
          className="ml-2 inline-block h-4 w-2 align-middle bg-accent-2"
          style={{ animation: 'proto-blink 1s step-end infinite' }}
        />
      </p>

      <h1 id="hero-title" className="text-[17vw] font-bold leading-[0.9] tracking-[-0.03em] md:text-[10rem]">
        <span className="block" style={{ animation: 'fadeIn 0.9s ease both' }}>
          {t.name[0]}
        </span>
        <span
          className="block"
          style={{
            background: ACCENT_GRADIENT,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            animation: 'fadeIn 0.9s ease 0.12s both',
          }}
        >
          {t.name[1]}
        </span>
      </h1>

      <div className="mt-8 grid items-end gap-8 md:grid-cols-12">
        <div className="md:col-span-6">
          <p
            className="pretty text-lg leading-snug text-muted md:text-xl"
            style={{ animation: 'fadeIn 0.9s ease 0.3s both' }}
          >
            {t.statement}
          </p>

          <p
            className="mt-5 inline-flex flex-wrap items-center gap-x-2 gap-y-1 border border-white/15 bg-white/[0.03] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-paper"
            style={{ animation: 'fadeIn 0.9s ease 0.4s both' }}
          >
            <SignalDot color={ACCENT_2} />
            <span className="text-muted-dim">{t.ui.now}</span>
            <span>{t.now}</span>
          </p>
        </div>

        <div className="flex md:col-span-6 md:justify-end">
          <div className="mr-8 hidden aspect-square w-36 shrink-0 overflow-hidden rounded-xl border border-white/15 md:block lg:w-40">
            {showPortrait ? (
              <GeneratedPortrait
                src="/images/rafael.webp"
                seed={SEED}
                color={ACCENT_DEEP}
                background={PORTRAIT_BACKGROUND}
                cell={3}
                alt={t.fullName}
                className="block w-full"
              />
            ) : null}
          </div>

          <ul className="space-y-2.5 font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
            {t.roles.map((role, index) => (
              <li
                key={role}
                className="flex items-center gap-3"
                style={{ animation: `fadeIn 0.7s ease ${0.4 + index * 0.1}s both` }}
              >
                <SignalDot
                  color={index === 0 ? ACCENT_2 : ACCENT}
                  glow={null}
                  style={{ animationDelay: `${index * 0.3}s` }}
                />
                {role}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
