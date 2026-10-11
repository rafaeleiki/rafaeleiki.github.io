'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import GeneratedBackdrop from './GeneratedBackdrop';
import GeneratedPortrait from './GeneratedPortrait';
import { DATA } from './site-data';

const SEED = 1996;
const BG = '#050509';
const PANEL = 'rgba(124,108,255,0.05)';
const TEXT = '#e8eaf4';
const MUTED = '#8a90a6';
const ACCENT = '#7c6cff';
const ACCENT2 = '#2ee6c6';
const DISPLAY = 'var(--font-signal)';
const MONO = 'var(--font-mono)';
const GRAD = `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})`;

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

function useParticleField(count = 56) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rand = mulberry32(SEED);
    let w = 0, h = 0, dpr = 1, raf = 0, running = true;
    let parts = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
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
        a: 0.12 + rand() * 0.45,
        c: rand() > 0.5 ? ACCENT : ACCENT2,
      }));
    };
    resize();
    init();

    const step = () => {
      raf = requestAnimationFrame(step);
      if (!running || reduced || document.hidden) return;
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
    raf = requestAnimationFrame(step);

    const io = new IntersectionObserver(([e]) => (running = e.isIntersecting), { threshold: 0 });
    io.observe(canvas);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [count]);
  return ref;
}

function useCursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(hover: none)').matches) return;
    let tx = innerWidth / 2, ty = innerHeight / 2, x = tx, y = ty, raf;
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
    window.addEventListener('mousemove', move);
    raf = requestAnimationFrame(step);
    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return ref;
}

function useParallax(speed = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0, ticking = false;
    const update = () => {
      ticking = false;
      const r = el.getBoundingClientRect();
      el.style.transform = `translate3d(0, ${(r.top + r.height / 2 - innerHeight / 2) * speed}px, 0)`;
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
  }, [speed]);
  return ref;
}

export default function SignalSite() {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('lang');
    if (p === 'pt' || p === 'en') setLang(p);
  }, []);

  const toggleLang = () => {
    const next = lang === 'en' ? 'pt' : 'en';
    setLang(next);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', next);
      window.history.replaceState(null, '', url);
    }
  };

  const t = DATA[lang];
  const canvasRef = useParticleField(56);
  const glowRef = useCursorGlow();
  const paraRef = useParallax(0.12);

  return (
    <main data-site style={{ background: BG, color: TEXT, fontFamily: DISPLAY, minHeight: '100vh' }} className="relative overflow-hidden">
      <GeneratedBackdrop seed={SEED} base={BG} colors={['#7c6cff', '#2ee6c6', '#4c3fce']} className="absolute inset-0 w-full h-full" />
      <canvas ref={canvasRef} className="fixed inset-0 -z-0 w-full h-full pointer-events-none" />
      <div
        ref={glowRef}
        className="fixed top-0 left-0 -z-0 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(124,108,255,0.16), transparent 60%)`, mixBlendMode: 'screen' }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">

        {/* header */}
        <header className="flex items-center justify-between py-5 text-[11px] uppercase tracking-[0.2em]" style={{ fontFamily: MONO, color: MUTED }}>
          <div className="flex items-center gap-2.5">
            <span className="proto-node w-2 h-2 rounded-full" style={{ background: ACCENT2, boxShadow: `0 0 10px ${ACCENT2}` }} />
            R. Eiki <span className="opacity-50">{'// live'}</span>
          </div>
          <nav className="hidden md:flex items-center gap-7">
            {['work', 'research', 'contact'].map((k) => (
              <a key={k} href={`#${k}`} className="hover:text-[#fff] transition-colors">{t.nav[k]}</a>
            ))}
            <button onClick={toggleLang} className="border border-white/15 px-2.5 py-1 hover:border-white/50 transition-colors">
              {t.contact.label.lang}
            </button>
          </nav>
        </header>

        {/* hero */}
        <section className="relative min-h-[92vh] flex flex-col justify-center py-16 overflow-hidden">
          <div ref={paraRef} className="absolute -right-6 top-10 select-none pointer-events-none text-[40vw] md:text-[26rem] font-bold leading-none" style={{ color: 'transparent', WebkitTextStroke: '1px rgba(124,108,255,0.18)' }}>
            RE
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40" style={{ overflow: 'hidden' }}>
            <div className="absolute inset-x-0 h-16" style={{ background: 'linear-gradient(180deg, transparent, rgba(124,108,255,0.08), transparent)', animation: 'proto-scan 7s linear infinite' }} />
          </div>

          <div className="text-[11px] uppercase tracking-[0.22em] mb-6" style={{ fontFamily: MONO, color: MUTED }}>
            system: portfolio <span style={{ color: ACCENT2 }}>{'//'}</span> online
            <span className="inline-block w-2 h-4 align-middle ml-2" style={{ background: ACCENT2, animation: 'proto-blink 1s step-end infinite' }} />
          </div>

          <h1 className="leading-[0.9] font-bold tracking-[-0.03em] text-[17vw] md:text-[10rem]">
            <span className="block" style={{ animation: 'fadeIn 0.9s ease both' }}>{t.name[0]}</span>
            <span className="block" style={{ background: GRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', animation: 'fadeIn 0.9s ease 0.12s both' }}>
              {t.name[1]}
            </span>
          </h1>

          <div className="mt-8 grid md:grid-cols-12 gap-8 items-end">
            <p className="md:col-span-6 text-lg md:text-xl leading-snug max-w-xl" style={{ color: MUTED, animation: 'fadeIn 0.9s ease 0.3s both' }}>
              {t.statement}
            </p>
            <div className="md:col-span-6 flex md:justify-end">
              <div className="hidden md:block mr-8 w-28 rounded-xl overflow-hidden border border-white/10">
                <GeneratedPortrait src="/images/rafael.webp" seed={SEED} color="#4c3fce" background="#e9e7f2" cell={4} className="w-full block" />
              </div>
              <ul className="space-y-2.5 text-[12px] uppercase tracking-[0.18em]" style={{ fontFamily: MONO, color: MUTED }}>
                {t.roles.map((r, i) => (
                  <li key={i} className="flex items-center gap-3" style={{ animation: `fadeIn 0.7s ease ${0.4 + i * 0.1}s both` }}>
                    <span className="proto-node w-1.5 h-1.5 rounded-full" style={{ background: i === 0 ? ACCENT2 : ACCENT, animationDelay: `${i * 0.3}s` }} />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* metrics — readouts */}
        <Reveal>
          <section className="py-14 grid grid-cols-2 lg:grid-cols-4 border-y border-white/10">
            {t.metrics.map((m, i) => (
              <div key={i} className="px-2 py-8" style={{ borderLeft: i ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <div className="flex items-center gap-2 text-4xl md:text-5xl font-semibold" style={{ color: i % 2 ? ACCENT2 : '#fff' }}>
                  {m.value}
                  <span className="proto-node w-1.5 h-1.5 rounded-full" style={{ background: ACCENT, animationDelay: `${i * 0.25}s` }} />
                </div>
                <div className="mt-3 text-[11px] uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: MUTED }}>{m.label}</div>
              </div>
            ))}
          </section>
        </Reveal>

        {/* work — signal log */}
        <section id="work" className="py-20">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="text-[11px] uppercase tracking-[0.24em]" style={{ fontFamily: MONO, color: ACCENT2 }}>
              ◉ {t.sections.work}
            </h2>
            <span className="text-[11px] uppercase tracking-[0.2em] opacity-50" style={{ fontFamily: MONO }}>{String(t.work.length).padStart(2, '0')} entries</span>
          </div>

          <div>
            {t.work.map((w, i) => (
              <Reveal key={i} delay={(i % 3) * 60}>
                <div className="group relative grid grid-cols-12 gap-4 py-7 border-t border-white/10 hover:bg-white/[0.02] transition-colors">
                  <span className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300" style={{ background: GRAD }} />
                  <div className="col-span-2 md:col-span-1 flex items-start pt-1">
                    <span className="proto-node w-2.5 h-2.5 rounded-full group-hover:scale-125 transition-transform" style={{ background: w.kind === 'Founding' ? ACCENT2 : ACCENT, boxShadow: `0 0 12px ${w.kind === 'Founding' ? ACCENT2 : ACCENT}` }} />
                  </div>
                  <div className="col-span-10 md:col-span-4">
                    <h3 className="text-xl md:text-2xl font-semibold leading-tight">{w.role}</h3>
                    <p className="text-[12px] uppercase tracking-[0.14em] mt-1" style={{ fontFamily: MONO, color: MUTED }}>
                      {w.company} <span style={{ color: ACCENT }}>·</span> {w.period}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-4 text-[15px] leading-relaxed" style={{ color: MUTED }}>{w.summary}</div>
                  <div className="col-span-12 md:col-span-3 flex flex-wrap gap-1.5 md:justify-end content-start">
                    {w.stack.map((s) => (
                      <span key={s} className="border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em]" style={{ fontFamily: MONO, color: MUTED }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* research */}
        <section id="research" className="py-20">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-6">
              <Reveal>
                <p className="text-2xl md:text-3xl leading-snug font-medium">{t.research.intro}</p>
                <p className="mt-4 text-[14px]" style={{ color: MUTED }}>{t.research.advisor}</p>
              </Reveal>
            </div>
            <div className="md:col-span-6">
              <Reveal delay={100}>
                <div className="p-[1px]" style={{ background: `linear-gradient(160deg, ${ACCENT}, transparent 40%, transparent 60%, ${ACCENT2})` }}>
                  <div className="p-6" style={{ background: '#0a0a12' }}>
                    <div className="text-[11px] uppercase tracking-[0.16em] mb-5" style={{ fontFamily: MONO, color: ACCENT2 }}>
                      ▲ {t.research.award}
                    </div>
                    <ul className="space-y-4" style={{ fontFamily: MONO }}>
                      {t.research.papers.map((p, i) => (
                        <li key={i} className="flex gap-3 text-[13px] leading-snug">
                          <span style={{ color: ACCENT }}>[{i + 1}]</span>
                          <span>
                            {p.title}
                            <span className="block mt-0.5 opacity-60">{p.venue}</span>
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

        {/* ownership — coordinates */}
        <section className="py-20">
          <div className="grid md:grid-cols-3 gap-4">
            {t.own.map((o, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="relative p-6 border border-white/10 hover:border-white/25 transition-colors" style={{ background: PANEL }}>
                  <div className="text-[11px] uppercase tracking-[0.18em] mb-3" style={{ fontFamily: MONO, color: ACCENT2 }}>
                    coord 0{i + 1}
                  </div>
                  <div className="text-xl font-semibold">{o.title}</div>
                  <div className="mt-2 text-[13px] leading-snug" style={{ color: MUTED }}>{o.note}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* contact */}
        <footer id="contact" className="py-28 border-t border-white/10">
          <Reveal>
            <h2 className="text-[14vw] md:text-[9rem] leading-[0.9] font-bold tracking-[-0.03em]" style={{ background: GRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              {t.contact.cta}
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-8 text-[12px] uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: MUTED }}>
              <a href={t.contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#fff] transition-colors">
                <span className="w-2 h-2 rounded-full" style={{ background: ACCENT }} /> {t.contact.label.github}
              </a>
              <a href={t.contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#fff] transition-colors">
                <span className="w-2 h-2 rounded-full" style={{ background: ACCENT2 }} /> {t.contact.label.linkedin}
              </a>
              <button onClick={toggleLang} className="ml-auto border border-white/15 px-3 py-1.5 hover:border-white/50 transition-colors">
                {t.contact.label.lang}
              </button>
            </div>
          </Reveal>
        </footer>
      </div>
    </main>
  );
}
