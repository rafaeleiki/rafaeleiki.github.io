export default function ResearchPaper({ paper, index }) {
  return (
    <li>
      <a
        href={paper.href}
        target="_blank"
        rel="noreferrer"
        className="group pretty flex gap-3 text-[13px] leading-snug"
      >
        <span className="text-accent" aria-hidden="true">[{index + 1}]</span>
        <span>
          <span className="underline decoration-white/25 underline-offset-4 transition-colors group-hover:text-paper group-hover:decoration-accent-2">
            {paper.title}
          </span>
          <span className="mt-0.5 block text-muted-dim">{paper.venue}</span>
        </span>
        <span aria-hidden="true" className="ml-auto shrink-0 text-accent-2">↗</span>
      </a>
    </li>
  );
}
