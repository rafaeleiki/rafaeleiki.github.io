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
    <section className="skills-section">
      <p className="skills-title">Tech Stack</p>
      <div className="skills-groups">
        {SKILLS.map(({ category, tags }) => (
          <div key={category} className="skills-group">
            <span className="skills-category">{category}</span>
            <div className="skills-tags">
              {tags.map(tag => (
                <span key={tag} className="skill-tag">{tag}</span>
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
