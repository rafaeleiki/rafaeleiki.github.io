export default function SectionHeading({ id, children, meta, className = '' }) {
  return (
    <div className={`flex items-baseline justify-between ${className}`}>
      <h2 id={id} className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent-2">
        <span aria-hidden="true">◉ </span>
        {children}
      </h2>
      {meta ? (
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-dim">{meta}</span>
      ) : null}
    </div>
  );
}
