export default function ProjectCard({ project, index, actionLabel, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      aria-haspopup="dialog"
      className="group flex h-full cursor-pointer flex-col border-t border-white/15 pt-5 text-left"
    >
      <span className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-muted-dim">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <span>{project.year}</span>
      </span>

      <h3 className="mt-4 text-2xl font-semibold leading-tight transition-colors group-hover:text-accent-2 md:text-3xl">
        {project.title}
      </h3>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-accent-2">
        {project.field}
      </p>
      <p className="pretty mt-4 text-[14px] leading-relaxed text-muted">{project.summary}</p>

      <span className="mt-auto inline-flex items-center gap-2 pt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-paper">
        <span aria-hidden="true" className="text-accent-2">&#9654;</span>
        {actionLabel}
      </span>
    </button>
  );
}
