import SignalDot from './SignalDot';
import { ACCENT } from '../lib/tokens';

export default function WorkEntry({ entry }) {
  return (
    <article className="relative grid grid-cols-1 gap-4 border-t border-white/12 py-8 pl-7 lg:grid-cols-12 lg:gap-6 lg:pl-0">
      <SignalDot
        color={ACCENT}
        glow="12px"
        size="h-2.5 w-2.5"
        className="absolute left-0 top-[38px] lg:static lg:col-span-1 lg:mt-2 lg:justify-self-start"
      />

      <div className="lg:col-span-4">
        <h3 className="text-xl font-semibold leading-tight md:text-2xl">{entry.role}</h3>
        <p className="pretty mt-1 font-mono text-[12px] uppercase tracking-[0.14em] text-muted-dim">
          {entry.company}
          {entry.companyNote ? (
            <>
              {' '}
              <span aria-hidden="true" className="text-accent">·</span> {entry.companyNote}
            </>
          ) : null}
        </p>
        <p className="mt-0.5 font-mono text-[12px] uppercase tracking-[0.14em] text-muted-dim">
          {entry.period}
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {entry.stack.map((tag) => (
            <li
              key={tag}
              className="border border-white/12 px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-dim"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-7">
        <p className="pretty text-[15px] leading-relaxed text-paper md:text-base">{entry.summary}</p>
      </div>
    </article>
  );
}
