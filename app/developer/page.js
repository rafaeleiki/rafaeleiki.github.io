"use client";

import Grid from '../../components/grid';
import Layout from '../../components/layout';
import {
  EXPERIENCE_GRID,
  EDUCATION_GRID,
} from '../../components/page-constants/developer-constants';

const SKILLS = [
  { category: 'Frontend', tags: ['React', 'JavaScript', 'HTML & CSS'] },
  { category: 'Backend', tags: ['Ruby on Rails', 'Java', 'Spring', 'Hibernate', 'C#'] },
  { category: 'Mobile', tags: ['Android', 'Kotlin'] },
];

function SkillTags() {
  return (
    <section className="py-6 border-b border-primary-light/40 mb-6">
      <p className="text-xs font-semibold text-dark-light uppercase tracking-wider mb-4">
        Tech Stack
      </p>
      <div className="flex flex-col gap-3">
        {SKILLS.map(({ category, tags }) => (
          <div key={category} className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-bold text-primary uppercase tracking-wide min-w-[80px]">
              {category}
            </span>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-primary-light/50 text-primary px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function DeveloperPage() {
  return (
    <Layout page="developer">
      <SkillTags />
      <Grid
        messagesPrefix="/developer"
        initialGrid={EXPERIENCE_GRID}
        key="experiences-section"
      />
      <Grid
        messagesPrefix="/developer"
        initialGrid={EDUCATION_GRID}
        key="education-section"
      />
    </Layout>
  );
}
