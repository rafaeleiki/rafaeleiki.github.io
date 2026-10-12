// Curated bilingual content. Paper list is complete (4 entries, matching the
// "4 peer-reviewed papers" metric); the fourth was recovered from the previous
// site's i18n/translations.en.json.
//
// Every user-visible string lives here — nothing in the components should
// hardcode English, or it will leak onto the Portuguese page.

// ---------------------------------------------------------------- company marks
//
// The logo wall under "Selected work". Deliberately *not* derived from DATA.work:
// entries there are expected to be trimmed over time, and the wall has to keep
// standing on its own when they are.
//
// Language-neutral (a logo is a logo in both languages), so it lives outside DATA.
//
// `width`/`height` are the artwork's intrinsic pixel size and `displayH` is the
// rendered height in CSS px — a square mark needs more height than a wordmark to
// carry the same visual weight, so the two are not the same number.
//
// The wall paints every mark as a single white silhouette (see .logo-mark in
// app/globals.css). Artwork is stored in each brand's own colours, so flipping
// that one rule brings the palettes back. `brand: true` opts an entry out, for
// marks that stop reading once flattened.
//
// Sources, so any of these can be re-checked or replaced:
//   lift-ventures    liftventures.com wordmark
//   quintoandar      quintoandar.com.br/newsroom brand assets (white plate removed)
//   vivros           this repo's earlier layout (assets/img/vivros.png)
//   microsoft        simple-icons (CC0 icon set)
//   instituto-claro  institutoclaro.org.br site logo (white plate removed)
//   playkids         Movile-era PlayKids wordmark, archived from playkids.com
export const COMPANY_LOGOS = [
  { name: 'Lift Ventures', src: '/images/logos/lift-ventures.png', width: 640, height: 100, displayH: 25 },
  { name: 'QuintoAndar', src: '/images/logos/quintoandar.png', width: 640, height: 93, displayH: 24 },
  // Flattened to white the owl loses its eyes and reads as a blob, so it keeps
  // its own colours — the one colour note in the row.
  { name: 'Vivros', src: '/images/logos/vivros.png', width: 420, height: 299, displayH: 34, brand: true },
  { name: 'Microsoft', src: '/images/logos/microsoft.svg', width: 24, height: 24, displayH: 30 },
  { name: 'Instituto Claro', src: '/images/logos/instituto-claro.png', width: 420, height: 74, displayH: 24 },
  { name: 'PlayKids', src: '/images/logos/playkids.png', width: 222, height: 52, displayH: 26 },
];

export const DATA = {
  en: {
    meta: {
      htmlLang: 'en',
      ogLocale: 'en_US',
      title: 'Rafael Eiki — Engineer · Inventor',
      description:
        'Full-stack software engineer and founder building technology for education. Rails, React and Java, with published HCI research and a co-founded startup.',
    },
    ui: {
      status: '// live',
      eyebrow: 'system: portfolio // online',
      entries: 'entries',
      marks: 'marks',
      coord: 'coord',
      skip: 'Skip to content',
      switchTo: 'Switch language to',
    },
    monogram: 'RE',
    name: ['Rafael', 'Eiki'],
    roles: ['Full-Stack Software Engineer', 'Entrepreneur', 'EdTech Researcher'],
    statement:
      "I'm an engineer and founder. I take ideas from first sketch to shipped product — with the technical depth to build them and the ownership to see them through.",
    nav: { work: 'Work', research: 'Research', contact: 'Contact' },
    sections: {
      work: 'Selected work',
      companies: 'Companies I worked with',
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
        founding: false,
      },
      {
        role: 'Software Engineer III',
        company: 'QuintoAndar',
        period: 'Apr 2021 – Dec 2021',
        summary: 'Java (Spring, Hibernate) and React on a scaled marketplace.',
        stack: ['Java', 'Spring', 'React'],
        kind: 'Engineering',
        founding: false,
      },
      {
        role: 'Co-founder',
        company: 'Vivros',
        period: 'Jan 2018 – Mar 2021',
        summary:
          'Co-founded an interactive-books startup; led the business and built the site (Rails, React) and the Android app (Java, Kotlin).',
        stack: ['Ruby on Rails', 'React', 'Android'],
        kind: 'Founding',
        founding: true,
      },
      {
        role: 'Software Engineer Intern',
        company: 'Microsoft',
        period: 'Dec 2018 – Mar 2019',
        summary: 'Built a partner-facing feature for Dynamics 365 in C#.',
        stack: ['C#', '.NET'],
        kind: 'Engineering',
        founding: false,
      },
      {
        role: 'EdTech Business Mentor',
        company: 'Instituto Claro',
        period: 'Oct 2022 – Present',
        summary: 'Mentor EdTech startups in the Campus Mobile entrepreneurship program.',
        stack: ['Mentorship', 'EdTech'],
        kind: 'Founding',
        founding: true,
      },
      {
        role: 'Jr. Full-Stack Developer',
        company: 'PlayKids (Movile)',
        period: 'Nov 2015 – Jun 2016',
        summary: 'Built the CMS for an app with 6M monthly users; Rails, jQuery, Spring.',
        stack: ['Ruby on Rails', 'jQuery', 'Spring'],
        kind: 'Engineering',
        founding: false,
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
        {
          title: 'Sistemas socioenativos para leitura colaborativa: construção técnica, pedagógica e de design',
          venue: 'WTD IC Unicamp ’18',
        },
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
    meta: {
      htmlLang: 'pt-BR',
      ogLocale: 'pt_BR',
      title: 'Rafael Eiki — Engenheiro · Inventor',
      description:
        'Engenheiro de software full-stack e fundador construindo tecnologia para a educação. Rails, React e Java, com pesquisa publicada em IHC e uma startup cofundada.',
    },
    ui: {
      status: '// ativo',
      eyebrow: 'sistema: portfólio // online',
      entries: 'registros',
      marks: 'marcas',
      coord: 'coord',
      skip: 'Pular para o conteúdo',
      switchTo: 'Mudar idioma para',
    },
    monogram: 'RE',
    name: ['Rafael', 'Eiki'],
    roles: ['Desenvolvedor Full-Stack', 'Empreendedor', 'Pesquisador em EdTech'],
    statement:
      'Sou engenheiro e fundador. Levo ideias do primeiro esboço ao produto — com profundidade técnica para construir e autonomia para levar até o fim.',
    nav: { work: 'Trabalho', research: 'Pesquisa', contact: 'Contato' },
    sections: {
      work: 'Trabalho selecionado',
      companies: 'Empresas com que trabalhei',
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
        founding: false,
      },
      {
        role: 'Engenheiro de Software III',
        company: 'QuintoAndar',
        period: 'Abr 2021 – Dez 2021',
        summary: 'Java (Spring, Hibernate) e React em um marketplace de escala.',
        stack: ['Java', 'Spring', 'React'],
        kind: 'Engenharia',
        founding: false,
      },
      {
        role: 'Cofundador',
        company: 'Vivros',
        period: 'Jan 2018 – Mar 2021',
        summary:
          'Cofundei uma startup de livros interativos; liderei o negócio e construí o site (Rails, React) e o app Android (Java, Kotlin).',
        stack: ['Ruby on Rails', 'React', 'Android'],
        kind: 'Fundação',
        founding: true,
      },
      {
        role: 'Estágio em Engenharia de Software',
        company: 'Microsoft',
        period: 'Dez 2018 – Mar 2019',
        summary: 'Feature para parceiros do Dynamics 365 em C#.',
        stack: ['C#', '.NET'],
        kind: 'Engenharia',
        founding: false,
      },
      {
        role: 'Mentor de Startups de EdTech',
        company: 'Instituto Claro',
        period: 'Out 2022 – Presente',
        summary: 'Mentoria de startups EdTech no programa Campus Mobile.',
        stack: ['Mentoria', 'EdTech'],
        kind: 'Fundação',
        founding: true,
      },
      {
        role: 'Desenvolvedor Full-Stack Jr.',
        company: 'PlayKids (Movile)',
        period: 'Nov 2015 – Jun 2016',
        summary: 'CMS para um app com 6M de usuários/mês; Rails, jQuery, Spring.',
        stack: ['Ruby on Rails', 'jQuery', 'Spring'],
        kind: 'Engenharia',
        founding: false,
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
        {
          title: 'Sistemas socioenativos para leitura colaborativa: construção técnica, pedagógica e de design',
          venue: 'WTD IC Unicamp ’18',
        },
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
