import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function MentorshipSection({ t }) {
  return (
    <section id="mentorship" aria-labelledby="mentorship-title" className="py-20">
      <SectionHeading id="mentorship-title" className="mb-10">
        {t.sections.mentorship}
      </SectionHeading>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
        <Reveal as="figure" className="lg:col-span-7">
          <div className="overflow-hidden border border-white/12">
            <img
              src={t.mentorship.photo.src}
              srcSet={t.mentorship.photo.srcSet}
              sizes={t.mentorship.photo.sizes}
              alt={t.mentorship.photo.alt}
              width={t.mentorship.photo.width}
              height={t.mentorship.photo.height}
              loading="lazy"
              decoding="async"
              className="block aspect-[3/2] w-full object-cover"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-5 lg:self-center">
          <Reveal>
            <p className="pretty text-2xl font-medium leading-snug md:text-3xl">{t.mentorship.intro}</p>
            <p className="pretty mt-5 text-[13.5px] leading-relaxed text-muted">{t.mentorship.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
