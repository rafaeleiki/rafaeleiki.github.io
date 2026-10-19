import LogoMark from './LogoMark';
import SectionHeading from './SectionHeading';
import { RECOGNITION_LOGOS } from './site-data';

export default function RecognitionSection({ t }) {
  return (
    <section id="recognition" aria-labelledby="recognition-title" className="py-20">
      <SectionHeading id="recognition-title" meta={t.ui.selection} className="mb-10">
        {t.sections.recognition}
      </SectionHeading>

      <ul className="recognition-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {t.recognition.map((award, index) => {
          const logo = RECOGNITION_LOGOS[award.key];
          const isLast = index === t.recognition.length - 1;

          return (
            <li
              key={award.key}
              className={`flex flex-col items-center justify-start gap-3 px-3 py-6 ${
                isLast ? 'col-span-2 sm:col-span-1' : ''
              }`}
            >
              <LogoMark {...logo} />
              {logo.text ? (
                <span aria-hidden="true" className="h-[13px]" />
              ) : (
                <span className="text-center font-mono text-[11px] uppercase leading-tight tracking-[0.12em] text-muted-dim">
                  {award.name}
                </span>
              )}
              <span className="pretty text-center text-[11px] leading-snug text-muted">{award.caption}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
