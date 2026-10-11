// Curated bilingual content for the three prototypes. Body copy is trimmed for
// the redesign; the full paper abstracts and every role live in i18n/translations.*.

export const DATA = {
  en: {
    monogram: 'RE',
    name: ['Rafael', 'Eiki'],
    roles: ['Full-Stack Software Engineer', 'Entrepreneur', 'EdTech Researcher'],
    tagline: 'Building technology for education.',
    statement:
      "I'm an engineer and founder. I take ideas from first sketch to shipped product — with the technical depth to build them and the ownership to see them through.",
    nav: { work: 'Work', research: 'Research', contact: 'Contact' },
    sections: {
      work: 'Selected work',
      metrics: 'Spec sheet',
      research: 'Research',
      own: 'Ownership',
      contact: 'Get in touch',
    },
    metrics: [
      { value: '10+', label: 'years building software' },
      { value: '20+', label: 'awards across science fairs' },
      { value: '4', label: 'peer-reviewed papers' },
      { value: '1', label: 'startup co-founded' },
    ],
    work: [
      {
        role: 'Senior Software Engineer',
        company: 'Lift Ventures',
        period: 'Jan 2022 – Present',
        summary: 'Full-stack, shipping Ruby on Rails and React.',
        stack: ['Ruby on Rails', 'React'],
        kind: 'Engineering',
      },
      {
        role: 'Software Engineer III',
        company: 'QuintoAndar',
        period: 'Apr 2021 – Dec 2021',
        summary: 'Java (Spring, Hibernate) and React on a scaled marketplace.',
        stack: ['Java', 'Spring', 'React'],
        kind: 'Engineering',
      },
      {
        role: 'Co-founder',
        company: 'Vivros',
        period: 'Jan 2018 – Mar 2021',
        summary:
          'Co-founded an interactive-books startup; led the business and built the site (Rails, React) and the Android app (Java, Kotlin).',
        stack: ['Ruby on Rails', 'React', 'Android'],
        kind: 'Founding',
      },
      {
        role: 'Software Engineer Intern',
        company: 'Microsoft',
        period: 'Dec 2018 – Mar 2019',
        summary: 'Built a partner-facing feature for Dynamics 365 in C#.',
        stack: ['C#', '.NET'],
        kind: 'Engineering',
      },
      {
        role: 'EdTech Business Mentor',
        company: 'Instituto Claro',
        period: 'Oct 2022 – Present',
        summary: 'Mentor EdTech startups in the Campus Mobile entrepreneurship program.',
        stack: ['Mentorship', 'EdTech'],
        kind: 'Founding',
      },
      {
        role: 'Jr. Full-Stack Developer',
        company: 'PlayKids (Movile)',
        period: 'Nov 2015 – Jun 2016',
        summary: 'Built the CMS for an app with 6M monthly users; Rails, jQuery, Spring.',
        stack: ['Ruby on Rails', 'jQuery', 'Spring'],
        kind: 'Engineering',
      },
    ],
    research: {
      intro:
        'Alongside engineering, I research how people and technology couple — human-computer interaction for education.',
      advisor: 'Advised by M. Cecília C. Baranauskas, a global reference in HCI.',
      award: 'Best Undergraduate Research 2018 — UNICAMP Computing Institute.',
      papers: [
        { title: 'A framework for socio-enactive educational systems', venue: 'IHC ’19' },
        { title: 'Reading as a Collaborative Construction', venue: 'Educational Informatics ’18' },
        { title: 'Collaborative reading with augmented reality', venue: 'SBIE ’18' },
      ],
    },
    own: [
      { title: 'DevY', note: 'Creator & coordinator — mentored 12 young-researcher projects → 20 awards.' },
      { title: 'Vivros', note: 'Co-founder of an interactive-books startup.' },
      { title: 'FEBRACE / FBJC', note: 'Organizer and reviewer at national science fairs.' },
    ],
    contact: {
      cta: "Let's build something.",
      github: 'https://github.com/rafaeleiki',
      linkedin: 'https://www.linkedin.com/in/rafaeleiki/',
      label: { github: 'GitHub', linkedin: 'LinkedIn', lang: 'Português' },
    },
  },

  pt: {
    monogram: 'RE',
    name: ['Rafael', 'Eiki'],
    roles: ['Desenvolvedor Full-Stack', 'Empreendedor', 'Pesquisador em EdTech'],
    tagline: 'Construindo tecnologia para educação.',
    statement:
      'Sou engenheiro e fundador. Levo ideias do primeiro esboço ao produto — com profundidade técnica para construir e autonomia para levar até o fim.',
    nav: { work: 'Trabalho', research: 'Pesquisa', contact: 'Contato' },
    sections: {
      work: 'Trabalho selecionado',
      metrics: 'Ficha técnica',
      research: 'Pesquisa',
      own: 'Autoria',
      contact: 'Entre em contato',
    },
    metrics: [
      { value: '10+', label: 'anos construindo software' },
      { value: '20+', label: 'prêmios em feiras de ciência' },
      { value: '4', label: 'artigos publicados' },
      { value: '1', label: 'startup cofundada' },
    ],
    work: [
      {
        role: 'Engenheiro de Software Sênior',
        company: 'Lift Ventures',
        period: 'Jan 2022 – Presente',
        summary: 'Full-stack, com Ruby on Rails e React.',
        stack: ['Ruby on Rails', 'React'],
        kind: 'Engenharia',
      },
      {
        role: 'Engenheiro de Software III',
        company: 'QuintoAndar',
        period: 'Abr 2021 – Dez 2021',
        summary: 'Java (Spring, Hibernate) e React em um marketplace de escala.',
        stack: ['Java', 'Spring', 'React'],
        kind: 'Engenharia',
      },
      {
        role: 'Cofundador',
        company: 'Vivros',
        period: 'Jan 2018 – Mar 2021',
        summary:
          'Cofundei uma startup de livros interativos; liderei o negócio e construí o site (Rails, React) e o app Android (Java, Kotlin).',
        stack: ['Ruby on Rails', 'React', 'Android'],
        kind: 'Fundação',
      },
      {
        role: 'Estágio em Engenharia de Software',
        company: 'Microsoft',
        period: 'Dez 2018 – Mar 2019',
        summary: 'Feature para parceiros do Dynamics 365 em C#.',
        stack: ['C#', '.NET'],
        kind: 'Engenharia',
      },
      {
        role: 'Mentor de Startups de EdTech',
        company: 'Instituto Claro',
        period: 'Out 2022 – Presente',
        summary: 'Mentoria de startups EdTech no programa Campus Mobile.',
        stack: ['Mentoria', 'EdTech'],
        kind: 'Fundação',
      },
      {
        role: 'Desenvolvedor Full-Stack Jr.',
        company: 'PlayKids (Movile)',
        period: 'Nov 2015 – Jun 2016',
        summary: 'CMS para um app com 6M de usuários/mês; Rails, jQuery, Spring.',
        stack: ['Ruby on Rails', 'jQuery', 'Spring'],
        kind: 'Engenharia',
      },
    ],
    research: {
      intro:
        'Em paralelo à engenharia, pesquiso como pessoas e tecnologia se acoplam — interação humano-computador para a educação.',
      advisor: 'Orientado por M. Cecília C. Baranauskas, referência mundial em IHC.',
      award: 'Melhor Iniciação Científica 2018 — Instituto de Computação da UNICAMP.',
      papers: [
        { title: 'A framework for socio-enactive educational systems', venue: 'IHC ’19' },
        { title: 'Reading as a Collaborative Construction', venue: 'Educational Informatics ’18' },
        { title: 'Leitura colaborativa com realidade aumentada', venue: 'SBIE ’18' },
      ],
    },
    own: [
      { title: 'DevY', note: 'Criador & coordenador — 12 projetos de jovens pesquisadores → 20 prêmios.' },
      { title: 'Vivros', note: 'Cofundador de uma startup de livros interativos.' },
      { title: 'FEBRACE / FBJC', note: 'Organizador e avaliador de feiras de ciência nacionais.' },
    ],
    contact: {
      cta: 'Vamos construir algo.',
      github: 'https://github.com/rafaeleiki',
      linkedin: 'https://www.linkedin.com/in/rafaeleiki/',
      label: { github: 'GitHub', linkedin: 'LinkedIn', lang: 'English' },
    },
  },
};
