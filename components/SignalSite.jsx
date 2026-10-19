'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Reveal from './Reveal';
import GeneratedBackdrop from './GeneratedBackdrop';
import GeneratedPortrait from './GeneratedPortrait';
import useMediaQuery from './hooks/useMediaQuery';
import { COMPANY_LOGOS, DATA, RECOGNITION_LOGOS } from './site-data';

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

  // Project demos open in a native modal so a click never leaves the page. The
  // video/iframe is only mounted while a demo is selected, which also stops
  // playback when the dialog closes.
  const [activeDemo, setActiveDemo] = useState(null);
  const demoDialogRef = useRef(null);

  useEffect(() => {
    const dialog = demoDialogRef.current;
    if (activeDemo && dialog && !dialog.open) dialog.showModal();
  }, [activeDemo]);

  const closeDemo = () => demoDialogRef.current?.close();

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
            {t.ui.identity} <span className="text-muted-dim">{t.ui.status}</span>
          </div>

          <nav className="hidden items-center gap-5 sm:flex">
            {/* Recognition joins the nav only from lg, where the row has room;
                below that it stays a scroll-only section so the header keeps its
                single-line HUD rhythm instead of running edge to edge. */}
            {['work', 'research', 'recognition', 'contact'].map((k) => (
              <a
                key={k}
                href={`#${k}`}
                className={`${
                  k === 'recognition' ? 'hidden lg:inline-flex' : 'inline-flex'
                } min-h-6 items-center transition-colors hover:text-paper`}
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
              <div className="md:col-span-6">
                <p
                  className="pretty text-lg leading-snug text-muted md:text-xl"
                  style={{ animation: 'fadeIn 0.9s ease 0.3s both' }}
                >
                  {t.statement}
                </p>
                {/* The one fact a recruiter wants above the fold: what the job
                    is today. Period and title also live in the work log. */}
                <p
                  className="mt-5 inline-flex flex-wrap items-center gap-x-2 gap-y-1 border border-white/15 bg-white/[0.03] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-paper"
                  style={{ animation: 'fadeIn 0.9s ease 0.4s both' }}
                >
                  <span
                    aria-hidden="true"
                    className="proto-node h-1.5 w-1.5 rounded-full bg-accent-2"
                    style={{ boxShadow: `0 0 10px ${ACCENT2}` }}
                  />
                  <span className="text-muted-dim">{t.ui.now}</span>
                  <span>{t.now}</span>
                </p>
              </div>
              <div className="flex md:col-span-6 md:justify-end">
                <div className="mr-8 hidden w-36 shrink-0 overflow-hidden rounded-xl border border-white/15 md:block lg:w-40">
                  <GeneratedPortrait
                    src="/images/rafael.webp"
                    seed={SEED}
                    color="#4c3fce"
                    background="#e9e7f2"
                    cell={3}
                    alt={t.fullName}
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
                  <article className="relative grid grid-cols-1 gap-4 border-t border-white/12 py-8 pl-7 lg:grid-cols-12 lg:gap-6 lg:pl-0">
                    <span
                      aria-hidden="true"
                      className="proto-node absolute left-0 top-[38px] h-2.5 w-2.5 rounded-full lg:static lg:col-span-1 lg:mt-2 lg:justify-self-start"
                      style={{ background: ACCENT, boxShadow: `0 0 12px ${ACCENT}` }}
                    />
                    <div className="lg:col-span-4">
                      <h3 className="text-xl font-semibold leading-tight md:text-2xl">{w.role}</h3>
                      <p className="pretty mt-1 font-mono text-[12px] uppercase tracking-[0.14em] text-muted-dim">
                        {w.company}
                        {w.companyNote ? (
                          <>
                            {' '}
                            <span aria-hidden="true" className="text-accent">·</span> {w.companyNote}
                          </>
                        ) : null}
                      </p>
                      <p className="mt-0.5 font-mono text-[12px] uppercase tracking-[0.14em] text-muted-dim">
                        {w.period}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {w.stack.map((s) => (
                          <span
                            key={s}
                            className="border border-white/12 px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-dim"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="lg:col-span-7">
                      <p className="pretty text-[15px] leading-relaxed text-paper md:text-base">{w.summary}</p>
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

          {/* projects — four dated builds, each opening a demo */}
          <section id="projects" aria-labelledby="projects-title" className="py-20">
            <div className="mb-10">
              <div className="flex items-baseline justify-between">
                <SectionLabel id="projects-title">{t.sections.projects}</SectionLabel>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-dim">
                  {String(t.projects.length).padStart(2, '0')} {t.ui.projects}
                </span>
              </div>
              <p className="pretty mt-3 max-w-xl text-[14px] leading-relaxed text-muted">
                {t.projectsIntro}
              </p>
            </div>
            <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {t.projects.map((p, i) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => setActiveDemo(p)}
                  aria-haspopup="dialog"
                  className="group flex h-full cursor-pointer flex-col border-t border-white/15 pt-5 text-left"
                >
                  <span className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-muted-dim">
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <span>{p.year}</span>
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold leading-tight transition-colors group-hover:text-accent-2 md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-accent-2">{p.field}</p>
                  <p className="pretty mt-4 text-[14px] leading-relaxed text-muted">{p.summary}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-paper">
                    <span aria-hidden="true" className="text-accent-2">&#9654;</span>
                    {t.ui.watch}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* research */}
          <section id="research" aria-labelledby="research-title" className="py-20">
            <SectionLabel id="research-title" className="mb-10">
              {t.sections.research}
            </SectionLabel>
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <Reveal>
                  <p className="pretty text-2xl font-medium leading-snug md:text-3xl">{t.research.intro}</p>
                  <div className="mt-6 border-l border-white/15 pl-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-dim">
                      {t.research.advisor.label}
                    </p>
                    <p className="mt-1 text-[15px] font-medium leading-snug text-paper">{t.research.advisor.name}</p>
                    <p className="pretty mt-1 text-[13px] leading-relaxed text-muted">{t.research.advisor.note}</p>
                  </div>
                </Reveal>
              </div>
              <div className="lg:col-span-6">
                <Reveal delay={100}>
                  <div className="p-px" style={{ background: GRAD }}>
                    <div className="bg-panel p-6">
                      <ul className="space-y-5 font-mono">
                        {t.research.papers.map((p, i) => (
                          <li key={p.href}>
                            <a
                              href={p.href}
                              target="_blank"
                              rel="noreferrer"
                              className="group pretty flex gap-3 text-[13px] leading-snug"
                            >
                              <span className="text-accent" aria-hidden="true">[{i + 1}]</span>
                              <span>
                                <span className="underline decoration-white/25 underline-offset-4 transition-colors group-hover:text-paper group-hover:decoration-accent-2">
                                  {p.title}
                                </span>
                                <span className="mt-0.5 block text-muted-dim">{p.venue}</span>
                              </span>
                              <span aria-hidden="true" className="ml-auto shrink-0 text-accent-2">↗</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* recognition — the same wall language as the company marks, but for
              the organisations behind the awards */}
          <section id="recognition" aria-labelledby="recognition-title" className="py-20">
            <div className="mb-10 flex items-baseline justify-between">
              <SectionLabel id="recognition-title">{t.sections.recognition}</SectionLabel>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-dim">
                {t.ui.selection}
              </span>
            </div>
            <ul className="recognition-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              {t.recognition.map((r, i) => {
                const logo = RECOGNITION_LOGOS[r.key];
                return (
                  <li
                    key={r.key}
                    className={`flex flex-col items-center justify-start gap-3 px-3 py-6 ${
                      i === t.recognition.length - 1 ? 'col-span-2 sm:col-span-1' : ''
                    }`}
                  >
                    <span className="flex h-10 items-center justify-center">
                      {logo.src ? (
                        /* The mark is decorative: the name and caption below are
                           the accessible text. */
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={logo.src}
                          alt=""
                          width={logo.width}
                          height={logo.height}
                          loading="lazy"
                          decoding="async"
                          style={{ height: logo.displayH }}
                          className="logo-mark w-auto max-w-full object-contain"
                        />
                      ) : (
                        <span className="font-sans text-[16px] font-semibold tracking-[-0.01em] text-white">
                          {logo.text}
                        </span>
                      )}
                    </span>
                    {/* A text mark already says the name; the invisible line keeps
                        the captions on one baseline without repeating it. */}
                    {logo.text ? (
                      <span aria-hidden="true" className="h-[13px]" />
                    ) : (
                      <span className="text-center font-mono text-[11px] uppercase leading-tight tracking-[0.12em] text-muted-dim">
                        {r.name}
                      </span>
                    )}
                    <span className="pretty text-center text-[11px] leading-snug text-muted">{r.caption}</span>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* mentorship — the one place where the work is a person, not a log */}
          <section id="mentorship" aria-labelledby="mentorship-title" className="py-20">
            <SectionLabel id="mentorship-title" className="mb-10">
              {t.sections.mentorship}
            </SectionLabel>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
              <Reveal as="figure" className="lg:col-span-7">
                <div className="overflow-hidden border border-white/12">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.mentorship.photo.src}
                    alt={t.mentorship.photo.alt}
                    width={1500}
                    height={960}
                    loading="lazy"
                    decoding="async"
                    className="block aspect-[3/2] w-full object-cover"
                  />
                </div>
              </Reveal>

              <div className="lg:col-span-5 lg:self-center">
                <Reveal>
                  <p className="pretty text-2xl font-medium leading-snug md:text-3xl">{t.mentorship.intro}</p>
                  <p className="pretty mt-5 text-[13.5px] leading-relaxed text-muted">{t.mentorship.note}</p>
                </Reveal>
              </div>
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
            {/* The headline animates; the button is the only link, so the
                section never reads as one giant click target. */}
            <div>
              {/* `leading-[0.9]` makes the line box ~0.18em shorter than the font's
                  content area, but a text-clipped gradient only paints inside the
                  padding box — so descenders ("g" in "something"/"algo") fell
                  outside it and rendered transparent. The padding gives the
                  gradient room to reach them; the matching negative margins keep
                  the text and the surrounding spacing exactly where they were. */}
              <span className="cta-gradient pretty -my-[0.2em] block py-[0.2em] font-bold leading-[0.9] tracking-[-0.03em] text-[clamp(2.5rem,13vw,9rem)]">
                {t.contact.cta}
              </span>
              <a
                href={t.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group mt-8 inline-flex min-h-12 items-center gap-3 bg-accent-2 px-7 py-4 font-mono text-[13px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-paper"
              >
                {t.contact.label.button}
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  ↗
                </span>
              </a>
            </div>
          </Reveal>
        </footer>
      </div>

      {/* Project demo modal. Native <dialog> handles focus and Escape; clicking
          the backdrop closes it, and unmounting the player stops playback. */}
      <dialog
        ref={demoDialogRef}
        onClose={() => setActiveDemo(null)}
        onClick={(event) => {
          if (event.target === demoDialogRef.current) closeDemo();
        }}
        aria-labelledby="demo-title"
        className="demo-dialog"
      >
        {activeDemo ? (
          <div className="border border-white/15 bg-ink text-paper shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
            <div className="flex items-start justify-between gap-4 border-b border-white/12 px-4 py-3">
              <div>
                <h2 id="demo-title" className="text-lg font-semibold leading-tight">{activeDemo.title}</h2>
                <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-dim">
                  {activeDemo.field} <span aria-hidden="true" className="text-accent">·</span> {activeDemo.year}
                </p>
              </div>
              <button
                type="button"
                onClick={closeDemo}
                aria-label={t.ui.close}
                className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center border border-white/15 text-lg leading-none text-muted transition-colors hover:border-accent-2 hover:text-paper"
              >
                <span aria-hidden="true">✕</span>
              </button>
            </div>
            <div className="aspect-video bg-black">
              {activeDemo.demo.type === 'youtube' ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeDemo.demo.id}?autoplay=1&rel=0&playsinline=1`}
                  title={`${activeDemo.title} — demo`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full"
                />
              ) : (
                <video
                  src={activeDemo.demo.src}
                  aria-label={`${activeDemo.title} demo`}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="h-full w-full"
                />
              )}
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
