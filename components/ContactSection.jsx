import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function ContactSection({ t }) {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="border-t border-white/12 py-28">
      <Reveal>
        <SectionHeading id="contact-title" className="mb-8">
          {t.sections.contact}
        </SectionHeading>

        <div>
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
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              ↗
            </span>
          </a>
        </div>
      </Reveal>
    </footer>
  );
}
