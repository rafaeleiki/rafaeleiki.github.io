export const createWorkExperience = (name) => ({
  title: `${name}.title`,
  subtitle: `${name}.company`,
  time: `${name}.time`,
  description: `${name}.description`,
});

const createExperience = (name) => ({
  title: `${name}.title`,
  subtitle: `${name}.subtitle`,
  time: `${name}.time`,
  description: `${name}.description`,
});

export default createExperience;
