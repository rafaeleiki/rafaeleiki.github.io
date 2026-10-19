import LogoMark from './LogoMark';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { COMPANY_LOGOS } from './site-data';
import { formatCount } from '../lib/format';

export default function CompanyWall({ t }) {
  return (
    <Reveal as="section" aria-labelledby="companies-title" className="mt-16 border-t border-white/12 pt-10">
      <SectionHeading
        id="companies-title"
        meta={formatCount(COMPANY_LOGOS.length, t.ui.marks)}
        className="mb-8"
      >
        {t.sections.companies}
      </SectionHeading>

      <ul className="logo-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {COMPANY_LOGOS.map((logo) => (
          <li
            key={logo.name}
            className="logo-cell flex flex-col items-center justify-center gap-3 px-3 py-6"
          >
            <LogoMark {...logo} />
            <span className="text-center font-mono text-[11px] uppercase leading-tight tracking-[0.12em] text-muted-dim">
              {logo.name}
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
