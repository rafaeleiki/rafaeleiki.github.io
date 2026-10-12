'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import Reveal from './Reveal';
import GeneratedBackdrop from './GeneratedBackdrop';
import GeneratedPortrait from './GeneratedPortrait';
import useMediaQuery from './hooks/useMediaQuery';
import { COMPANY_LOGOS, DATA } from './site-data';

const SEED = 1996;

// Canvas fills need literal colours — ctx.fillStyle cannot resolve a CSS var().
// Keep these in sync with --color-accent / --color-accent-2 in app/globals.css.
const ACCENT = '#7c6cff';
const ACCENT2 = '#2ee6c6';
// DOM gradients can reference the tokens directly.
const GRAD = 'linear-gradient(90deg, var(--color-accent), var(--color-accent-2))';

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------------------------------------------------------- language
//
// The active language lives in the URL (?lang=), treated as an external store.
// Deriving it with useSyncExternalStore (rather than useState + a setState
// effect) avoids a cascading render, keeps the server/client snapshots explicit
// so hydration can't mismatch, and makes back/forward navigation work.
const LANG_EVENT = 'langchange';

const normalizeLang = (value) => (value === 'pt' || value === 'en' ? value : 'en');

function subscribeLang(onChange) {
  window.addEventListener('popstate', onChange);
  window.addEventListener(LANG_EVENT, onChange);
  return () => {
    window.removeEventListener('popstate', onChange);
    window.removeEventListener(LANG_EVENT, onChange);
  };
}

const getLangSnapshot = () => normalizeLang(new URLSearchParams(window.location.search).get('lang'));

// The static export is always English, so that is the server snapshot too.
const getLangServerSnapshot = () => 'en';

function writeLangToUrl(next) {
  const url = new URL(window.location.href);
  url.searchParams.set('lang', next);
  window.history.replaceState(null, '', url);
  window.dispatchEvent(new Event(LANG_EVENT));
}

// Motion preferences are read via useMediaQuery() directly in the component
// (see components/hooks/useMediaQuery.js).

// ---------------------------------------------------------------- canvas hooks

// Particle field. Starts only when motion is allowed, and the loop is torn down
// entirely (rather than scheduled-then-early-returned) while off-screen or when
// the tab is hidden.
function useParticleField(count = 34, enabled = true) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !enabled) return;
    const ctx = canvas.getContext('2d');
    const rand = mulberry32(SEED);
    let w = 0;
    let h = 0;
    let raf = 0;
    let parts = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const init = () => {
      parts = Array.from({ length: count }, () => ({
        x: rand() * w,
        y: rand() * h,
        vx: (rand() - 0.5) * 0.12,
        vy: (rand() - 0.5) * 0.12,
        r: 0.6 + rand() * 1.6,
        // Kept dim so a particle can never wash out text sitting above it.
        a: 0.05 + rand() * 0.14,
        c: rand() > 0.5 ? ACCENT : ACCENT2,
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.fillStyle = p.c;
        ctx.globalAlpha = p.a;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      draw();
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    resize();
    init();
    start();

    const io = new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? start() : stop()), { threshold: 0 });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    const onResize = () => {
      resize();
      init();
    };
    window.addEventListener('resize', onResize);
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize', onResize);
    };
  }, [count, enabled]);
  return ref;
}

// Cursor glow. Only runs on genuine hover devices with motion allowed — on touch
// the element used to stay mounted with no transform, parking a 480px light
// bloom in the top-left corner over the hero copy.
function useCursorGlow(enabled = true) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let raf = 0;
    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const step = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.transform = `translate(${x - 240}px, ${y - 240}px)`;
      raf = requestAnimationFrame(step);
    };
    window.addEventListener('mousemove', move, { passive: true });
    raf = requestAnimationFrame(step);
    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);
  return ref;
}

// Scroll parallax. CSS media queries cannot reach an inline transform, so the
// preference has to be checked here — this was the one element still moving
// under prefers-reduced-motion.
function useParallax(speed = 0.12, enabled = true) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    let raf = 0;
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = el.getBoundingClientRect();
      el.style.transform = `translate3d(0, ${(r.top + r.height / 2 - window.innerHeight / 2) * speed}px, 0)`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed, enabled]);
  return ref;
}

// ---------------------------------------------------------------- pieces

function SectionLabel({ id, children, className = '' }) {
  return (
    <h2 id={id} className={`font-mono text-[11px] uppercase tracking-[0.24em] text-accent-2 ${className}`}>
      <span aria-hidden="true">◉ </span>
      {children}
    </h2>
  );
}

export default function SignalSite() {
  // The static export is always English, so the server snapshot is 'en'; React
  // re-reads the URL immediately after hydration.
  const lang = useSyncExternalStore(subscribeLang, getLangSnapshot, getLangServerSnapshot);

  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');

  const t = DATA[lang];

  // Keep the document in sync with what is actually rendered: html lang, title,
  // description and og:locale. Without this the Portuguese page announced itself
  // as English (WCAG 3.1.1) and kept an English title/description.
  useEffect(() => {
    const { meta } = t;
    document.documentElement.lang = meta.htmlLang;
    const set = (sel, val) => {
      const el = document.querySelector(sel);
      if (el) el.setAttribute('content', val);
    };
    set('meta[name="description"]', meta.description);
    set('meta[property="og:locale"]', meta.ogLocale);
    set('meta[property="og:title"]', meta.title);
    set('meta[property="og:description"]', meta.description);
    set('meta[name="twitter:title"]', meta.title);
    set('meta[name="twitter:description"]', meta.description);

    document.title = meta.title;

    // Next re-applies the static <title> from the metadata export once, during
    // hydration of the initial load. That lands *after* this effect, so a deep
    // link (?lang=pt) got reverted to the English title. Keep it pinned; the
    // `!==` guard makes the observer terminate instead of looping.
    const titleEl = document.querySelector('title');
    if (!titleEl) return undefined;
    const observer = new MutationObserver(() => {
      if (document.title !== meta.title) document.title = meta.title;
    });
    observer.observe(titleEl, { childList: true, characterData: true, subtree: true });
    return () => observer.disconnect();
  }, [t]);

  const toggleLang = () => writeLangToUrl(lang === 'en' ? 'pt' : 'en');

  // Gate at render time, not just inside the effect: an inert-but-mounted glow
  // parks a 480px light bloom in the top-left corner over the hero copy.
  const showGlow = canHover && !reduced;
  const canvasRef = useParticleField(34, !reduced);
  const glowRef = useCursorGlow(showGlow);
  const paraRef = useParallax(0.12, !reduced);

  const targetLang = lang === 'en' ? 'pt' : 'en';
  const langButton = (extra) => (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={`${t.ui.switchTo} ${t.contact.label.lang}`}
      className={`border border-white/20 transition-colors hover:border-accent-2 hover:text-paper ${extra}`}
    >
      <span lang={targetLang}>{t.contact.label.lang}</span>
    </button>
  );

  return (
    <div data-site className="relative min-h-screen overflow-hidden bg-ink text-paper">
      <GeneratedBackdrop
        seed={SEED}
        base="#050509"
        colors={['#7c6cff', '#2ee6c6', '#4c3fce']}
        className="absolute inset-0 z-0 h-full w-full"
      />
      {!reduced ? (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 h-full w-full"
        />
      ) : null}
      {showGlow ? (
        <div
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-0 h-[480px] w-[480px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(124,108,255,0.14), transparent 60%)',
            mixBlendMode: 'screen',
          }}
        />
      ) : null}

      <a href="#main-content" className="skip-link">
        {t.ui.skip}
      </a>

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        {/* header */}
        <header className="flex items-center justify-between py-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="proto-node h-2 w-2 rounded-full bg-accent-2"
              style={{ boxShadow: `0 0 10px ${ACCENT2}` }}
            />
            R. Eiki <span className="text-muted-dim">{t.ui.status}</span>
          </div>

          <nav className="hidden items-center gap-7 sm:flex">
            {['work', 'research', 'contact'].map((k) => (
              <a
                key={k}
                href={`#${k}`}
                className="inline-flex min-h-6 items-center transition-colors hover:text-paper"
              >
                {t.nav[k]}
              </a>
            ))}
            {langButton('px-2.5 py-1')}
          </nav>

          {/* Below sm the nav collapses; the language toggle must stay reachable
              instead of living only at the very bottom of a 4,500px page. */}
          <div className="sm:hidden">{langButton('px-2.5 py-2')}</div>
        </header>

        <main id="main-content">
          {/* hero */}
          <section
            aria-labelledby="hero-title"
            className="relative flex min-h-[88svh] flex-col justify-center overflow-hidden py-16"
          >
            <div
              ref={paraRef}
              aria-hidden="true"
              className="pointer-events-none absolute -right-6 top-10 select-none text-[40vw] font-bold leading-none md:text-[26rem]"
              style={{ color: 'transparent', WebkitTextStroke: '1px rgba(124,108,255,0.18)' }}
            >
              RE
            </div>
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden">
              <div
                className="absolute inset-x-0 h-16"
                style={{
                  background: 'linear-gradient(180deg, transparent, rgba(124,108,255,0.08), transparent)',
                  animation: 'proto-scan 7s linear infinite',
                }}
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

            <h1
              id="hero-title"
              className="text-[17vw] font-bold leading-[0.9] tracking-[-0.03em] md:text-[10rem]"
            >
              <span className="block" style={{ animation: 'fadeIn 0.9s ease both' }}>
                {t.name[0]}
              </span>
              <span
                className="block"
                style={{
                  background: GRAD,
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
              <p
                className="pretty text-lg leading-snug text-muted md:col-span-6 md:text-xl"
                style={{ animation: 'fadeIn 0.9s ease 0.3s both' }}
              >
                {t.statement}
              </p>
              <div className="flex md:col-span-6 md:justify-end">
                <div className="mr-8 hidden w-36 shrink-0 overflow-hidden rounded-xl border border-white/15 md:block lg:w-40">
                  <GeneratedPortrait
                    src="/images/rafael.webp"
                    seed={SEED}
                    color="#4c3fce"
                    background="#e9e7f2"
                    cell={3}
                    alt={`${t.name[0]} ${t.name[1]}`}
                    className="block w-full"
                  />
                </div>
                <ul className="space-y-2.5 font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
                  {t.roles.map((r, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3"
                      style={{ animation: `fadeIn 0.7s ease ${0.4 + i * 0.1}s both` }}
                    >
                      <span
                        aria-hidden="true"
                        className="proto-node h-1.5 w-1.5 rounded-full"
                        style={{ background: i === 0 ? ACCENT2 : ACCENT, animationDelay: `${i * 0.3}s` }}
                      />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* metrics — spec sheet */}
          <Reveal>
            <section
              id="metrics"
              aria-labelledby="metrics-title"
              className="border-y border-white/12 py-12"
            >
              <SectionLabel id="metrics-title" className="mb-8">
                {t.sections.metrics}
              </SectionLabel>
              <div className="metrics-grid grid grid-cols-2 lg:grid-cols-4">
                {t.metrics.map((m, i) => (
                  <div key={i} className="py-6">
                    <div
                      className={`flex items-center gap-2 text-4xl font-semibold tabular-nums md:text-5xl ${
                        i % 2 ? 'text-accent-2' : 'text-paper'
                      }`}
                    >
                      {m.value}
                      <span
                        aria-hidden="true"
                        className="proto-node h-1.5 w-1.5 rounded-full bg-accent"
                        style={{ animationDelay: `${i * 0.25}s` }}
                      />
                    </div>
                    <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-dim">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* work — signal log */}
          <section id="work" aria-labelledby="work-title" className="py-20">
            <div className="mb-10 flex items-baseline justify-between">
              <SectionLabel id="work-title">{t.sections.work}</SectionLabel>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-dim">
                {String(t.work.length).padStart(2, '0')} {t.ui.entries}
              </span>
            </div>

            <div>
              {t.work.map((w, i) => (
                <Reveal key={i} delay={(i % 3) * 60}>
                  {/* One left edge at every breakpoint: below lg the whole entry
                      is indented past the gutter dot; from lg the dot takes its
                      own grid column. */}
                  <article className="relative grid grid-cols-1 gap-3 border-t border-white/12 py-7 pl-7 lg:grid-cols-12 lg:gap-6 lg:pl-0">
                    <span
                      aria-hidden="true"
                      className="proto-node absolute left-0 top-[38px] h-2.5 w-2.5 rounded-full lg:static lg:col-span-1 lg:mt-2 lg:justify-self-start"
                      style={{
                        background: w.founding ? ACCENT2 : ACCENT,
                        boxShadow: `0 0 12px ${w.founding ? ACCENT2 : ACCENT}`,
                      }}
                    />
                    <div className="lg:col-span-4">
                      <h3 className="text-xl font-semibold leading-tight md:text-2xl">{w.role}</h3>
                      <p className="pretty mt-1 font-mono text-[12px] uppercase tracking-[0.14em] text-muted-dim">
                        {w.company} <span aria-hidden="true" className="text-accent">·</span> {w.period}
                      </p>
                      {/* Kind was previously encoded in the dot colour alone (WCAG 1.4.1). */}
                      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-accent-2">
                        {w.kind}
                      </p>
                    </div>
                    <div className="pretty text-[15px] leading-relaxed text-muted lg:col-span-4">
                      {w.summary}
                    </div>
                    <div className="flex flex-wrap content-start gap-1.5 lg:col-span-3 lg:justify-end">
                      {w.stack.map((s) => (
                        <span
                          key={s}
                          className="border border-white/12 px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-dim"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* company marks — a subsection of the log above, but built from its
                own list (COMPANY_LOGOS) so trimming that log never disturbs it. */}
            <Reveal as="section" aria-labelledby="companies-title" className="mt-16 border-t border-white/12 pt-10">
              <div className="mb-8 flex items-baseline justify-between">
                <SectionLabel id="companies-title">{t.sections.companies}</SectionLabel>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-dim">
                  {String(COMPANY_LOGOS.length).padStart(2, '0')} {t.ui.marks}
                </span>
              </div>

              <ul className="logo-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                {COMPANY_LOGOS.map((c) => (
                  <li
                    key={c.name}
                    className="logo-cell flex flex-col items-center justify-center gap-3 px-3 py-6"
                  >
                    {/* The mark is decorative: the name below is the accessible
                        text, so the artwork carries no alt of its own. Plain
                        <img> is deliberate — the export is unoptimized, so
                        next/image would add markup without adding anything.
                        The fixed-height box keeps every name on one baseline
                        even though the marks differ in height. */}
                    <span className="flex h-10 items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={c.src}
                        alt=""
                        width={c.width}
                        height={c.height}
                        loading="lazy"
                        decoding="async"
                        style={{ height: c.displayH }}
                        className={`logo-mark w-auto max-w-full object-contain${c.brand ? ' logo-mark--brand' : ''}`}
                      />
                    </span>
                    <span className="text-center font-mono text-[11px] uppercase leading-tight tracking-[0.12em] text-muted-dim">
                      {c.name}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          {/* research */}
          <section id="research" aria-labelledby="research-title" className="py-20">
            <SectionLabel id="research-title" className="mb-10">
              {t.sections.research}
            </SectionLabel>
            <div className="grid gap-6 md:grid-cols-12">
              <div className="md:col-span-6">
                <Reveal>
                  <p className="pretty text-2xl font-medium leading-snug md:text-3xl">{t.research.intro}</p>
                  <p className="pretty mt-4 text-[14px] text-muted">{t.research.advisor}</p>
                </Reveal>
              </div>
              <div className="md:col-span-6">
                <Reveal delay={100}>
                  <div className="p-px" style={{ background: GRAD }}>
                    <div className="bg-panel p-6">
                      <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-2">
                        <span aria-hidden="true">▲ </span>
                        {t.research.award}
                      </p>
                      <ul className="space-y-4 font-mono">
                        {t.research.papers.map((p, i) => (
                          <li key={i} className="pretty flex gap-3 text-[13px] leading-snug">
                            <span className="text-accent" aria-hidden="true">[{i + 1}]</span>
                            <span>
                              {p.title}
                              <span className="mt-0.5 block text-muted-dim">{p.venue}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ownership */}
          <section id="ownership" aria-labelledby="ownership-title" className="py-20">
            <SectionLabel id="ownership-title" className="mb-10">
              {t.sections.own}
            </SectionLabel>
            <div className="grid gap-6 md:grid-cols-3">
              {t.own.map((o, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="relative h-full border border-white/12 p-6 transition-colors hover:border-white/30" style={{ background: 'rgba(124,108,255,0.05)' }}>
                    <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-2">
                      {t.ui.coord} 0{i + 1}
                    </div>
                    <h3 className="text-xl font-semibold">{o.title}</h3>
                    <p className="pretty mt-2 text-[13px] leading-snug text-muted">{o.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </main>

        {/* contact */}
        <footer id="contact" aria-labelledby="contact-title" className="border-t border-white/12 py-28">
          <Reveal>
            {/* The gap between the label and the CTA lives on the label: the CTA
                offsets its own padding with negative margins (see below), and
                adjoining margins would otherwise swallow that offset. */}
            <SectionLabel id="contact-title" className="mb-8">
              {t.sections.contact}
            </SectionLabel>
            {/* `leading-[0.9]` makes the line box ~0.18em shorter than the font's
                content area, but a text-clipped gradient only paints inside the
                padding box — so descenders ("g" in "something"/"algo") fell
                outside it and rendered transparent. The padding gives the
                gradient room to reach them; the matching negative margins keep
                the text and the surrounding spacing exactly where they were. */}
            <p
              className="pretty -my-[0.2em] py-[0.2em] font-bold leading-[0.9] tracking-[-0.03em] text-[clamp(2.5rem,13vw,9rem)]"
              style={{
                background: GRAD,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {t.contact.cta}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 font-mono text-[12px] uppercase tracking-[0.16em] text-muted">
              <a
                href={t.contact.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-paper"
              >
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
                {t.contact.label.github}
              </a>
              <a
                href={t.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-paper"
              >
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent-2" />
                {t.contact.label.linkedin}
              </a>
              {langButton('ml-auto px-3 py-2')}
            </div>
          </Reveal>
        </footer>
      </div>
    </div>
  );
}
