import ProjectCard from './ProjectCard';
import SectionHeading from './SectionHeading';
import { formatCount } from '../lib/format';

export default function ProjectsSection({ t, onOpenDemo }) {
  return (
    <section id="projects" aria-labelledby="projects-title" className="py-20">
      <div className="mb-10">
        <SectionHeading
          id="projects-title"
          meta={formatCount(t.projects.length, t.ui.projects)}
        >
          {t.sections.projects}
        </SectionHeading>
        <p className="pretty mt-3 max-w-xl text-[14px] leading-relaxed text-muted">
          {t.projectsIntro}
        </p>
      </div>

      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {t.projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            actionLabel={t.ui.watch}
            onOpen={onOpenDemo}
          />
        ))}
      </div>
    </section>
  );
}
