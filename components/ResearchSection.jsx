import ResearchPaper from './ResearchPaper';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { ACCENT_GRADIENT } from '../lib/tokens';

export default function ResearchSection({ t }) {
  return (
    <section id="research" aria-labelledby="research-title" className="py-20">
      <SectionHeading id="research-title" className="mb-10">
        {t.sections.research}
      </SectionHeading>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="pretty text-2xl font-medium leading-snug md:text-3xl">{t.research.intro}</p>
            <div className="mt-6 border-l border-white/15 pl-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-dim">
                {t.research.advisor.label}
              </p>
              <p className="mt-1 text-[15px] font-medium leading-snug text-paper">
                {t.research.advisor.name}
              </p>
              <p className="pretty mt-1 text-[13px] leading-relaxed text-muted">
                {t.research.advisor.note}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={100}>
            <div className="p-px" style={{ background: ACCENT_GRADIENT }}>
              <div className="bg-panel p-6">
                <ul className="space-y-5 font-mono">
                  {t.research.papers.map((paper, index) => (
                    <ResearchPaper key={paper.href} paper={paper} index={index} />
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
