import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import WorkEntry from './WorkEntry';
import CompanyWall from './CompanyWall';
import { formatCount } from '../lib/format';

export default function WorkSection({ t }) {
  return (
    <section id="work" aria-labelledby="work-title" className="py-20">
      <SectionHeading
        id="work-title"
        meta={formatCount(t.work.length, t.ui.entries)}
        className="mb-10"
      >
        {t.sections.work}
      </SectionHeading>

      <div>
        {t.work.map((entry, index) => (
          <Reveal key={entry.role} delay={(index % 3) * 60}>
            <WorkEntry entry={entry} />
          </Reveal>
        ))}
      </div>

      <CompanyWall t={t} />
    </section>
  );
}
