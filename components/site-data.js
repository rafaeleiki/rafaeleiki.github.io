// Curated bilingual content. Every user-visible string lives here — nothing in
// the components should hardcode English, or it will leak onto the Portuguese
// page.
//
// Source of truth for claims: the 2026 CV. The three most recent roles carry a
// one-sentence summary; there is no full employment history. Absent on purpose:
// email, phone, location and education.
//
// Papers link to the publisher / original PDF. The WTD-IC 2018 workshop abstract
// has no public copy, so the journal version of the same research (PIBIC 2019) is
// listed instead — every title below is one click from its source.
//
// The projects below were recovered from the archived layout-2019 branch
// (src/app/projects/projects.component.html) and trimmed to four entries.

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

// ---------------------------------------------------------------- recognition marks
//
// Same visual language as the company wall, but for the organisations behind the
// awards. Keyed by the entries in DATA.*.recognition (names/captions there are
// localised). First Ascent has no mark worth flattening, so it is set in type.
export const RECOGNITION_LOGOS = {
  facebook: { src: '/images/logos/facebook.svg', width: 24, height: 24, displayH: 24 },
  intel: { src: '/images/logos/intel.svg', width: 24, height: 24, displayH: 22 },
  microsoft: { src: '/images/logos/microsoft.svg', width: 24, height: 24, displayH: 26 },
  unicamp: { src: '/images/logos/unicamp.png', width: 480, height: 480, displayH: 36 },
  firstAscent: { text: 'First Ascent' },
};

export const DATA = {
  en: {
    meta: {
      htmlLang: 'en',
      ogLocale: 'en_US',
      title: 'Rafael Eiki — Engineering Leader',
      description:
        'Head of Engineering at SuperSummary. Eleven years building software and teams — from a co-founded EdTech startup to a 17-person engineering org.',
    },
    ui: {
      status: '// live',
      eyebrow: 'system: portfolio // online',
      entries: 'entries',
      projects: 'projects',
      marks: 'marks',
      selection: 'a selection',
      skip: 'Skip to content',
      switchTo: 'Switch language to',
      identity: 'R. Eiki Imamura',
      now: 'now',
      watch: 'Watch demo',
      close: 'Close',
    },
    monogram: 'RE',
    name: ['Rafael', 'Eiki'],
    fullName: 'Rafael Eiki Imamura',
    roles: ['Engineering Leadership', 'Former Startup Founder', 'HCI Researcher'],
    now: 'Head of Engineering · SuperSummary',
    statement:
      'I lead engineering teams and still write the code that matters. Eleven years taking products from first sketch to shipped — as a founder, and now leading a 17-person engineering org.',
    nav: { work: 'Work', research: 'Research', recognition: 'Awards', contact: 'Contact' },
    sections: {
      work: 'Selected work',
      companies: 'Companies I worked with',
      projects: 'Independent projects',
      research: 'Research',
      recognition: 'Awards & honors',
      mentorship: 'Mentorship',
      contact: 'Get in touch',
    },
    projectsIntro:
      'Personal projects I built independently, outside of client work.',
    work: [
      {
        role: 'Head of Engineering',
        company: 'SuperSummary',
        companyNote: 'Lift Ventures',
        period: 'Mar 2026 – Present',
        summary:
          'Lead a 17-person engineering org supporting product development across a range of stacks; built the AI and engineering culture and workflows from scratch.',
        stack: ['Next.js', 'Rails', 'Flutter'],
      },
      {
        role: 'Software Engineer III',
        company: 'QuintoAndar',
        period: 'Apr 2021 – Dec 2021',
        summary:
          "Co-developed the portfolio-houses model that moved the segment from the company's lowest to highest conversion rate and multiplied visit availability.",
        stack: ['Java', 'React'],
      },
      {
        role: 'Co-founder',
        company: 'Vivros',
        period: 'Dec 2017 – Mar 2021',
        summary:
          'Founded an EdTech startup that produced interactive pop-up books with a companion AR app, reaching NPS 90 with a team of seven.',
        stack: ['Rails', 'React', 'Kotlin'],
      },
    ],
    projects: [
      {
        title: 'Yarner',
        field: 'EdTech',
        year: '2014 – 2016',
        summary:
          'An interactive-book platform for schools that won 20+ awards, including Intel ISEF.',
        demo: { type: 'video', src: '/projects/yarner.mp4' },
      },
      {
        title: 'DefenseSnap',
        field: 'Safety hardware',
        year: '2017',
        summary:
          "A Moto Mod personal-safety wearable with a Bluetooth ring and siren; winner of Motorola's Mod the Future hackathon.",
        demo: { type: 'youtube', id: '5UKubnSYDfk' },
      },
      {
        title: 'CooKing',
        field: 'Consumer app',
        year: '2017',
        summary:
          'A kitchen assistant app that helps from choosing a dish to preparing it; national finalist at Imagine Cup 2017.',
        demo: { type: 'video', src: '/projects/cooking.mp4' },
      },
      {
        title: 'PaperPlay',
        field: 'Accessibility',
        year: '2018',
        summary:
          'A paper programming kit that lets blind and sighted players code a game together; winner of Facebook Hackathon Brazil.',
        demo: { type: 'video', src: '/projects/paperplay.mp4' },
      },
    ],
    research: {
      intro:
        'My research is in Human-Computer Interaction and EdTech: how people and technology co-construct meaning, and how to design systems that support it.',
      advisor: {
        label: 'Advised by',
        name: 'M. Cecília C. Baranauskas',
        note: 'Full professor at UNICAMP, co-founder of NIED, co-author of the first HCI book in Portuguese, and winner of the ACM SIGDOC Rigo Award and the first SBC-HCI Career Award.',
      },
      papers: [
        {
          title: 'A framework for socio-enactive educational systems: linking learning, design, and technology',
          venue: 'IHC ’19 · ACM',
          href: 'https://doi.org/10.1145/3357155.3358443',
        },
        {
          title: 'Reading as a Collaborative Construction: supporting the design of physico-virtual environments',
          venue: 'TISE ’18 · Nuevas Ideas en Informática Educativa',
          href: 'http://www.tise.cl/Volumen14/TISE2018/249.pdf',
        },
        {
          title:
            'Criando uma experiência de leitura colaborativa de histórias fictícias físico-virtuais com realidade aumentada',
          venue: 'SBIE ’18 · Brazilian Symposium on Computers in Education',
          href: 'http://milanesa.ime.usp.br/rbie/index.php/sbie/article/view/7951',
        },
        {
          title: 'Collaborative reading in the physical-virtual environment',
          venue: 'PIBIC · UNICAMP ’19',
          href: 'https://econtents.sbu.unicamp.br/eventos/index.php/pibic/article/view/1161',
        },
      ],
    },
    recognition: [
      { key: 'facebook', name: 'Facebook', caption: 'Hackathon Brazil — 1st, 2018' },
      { key: 'intel', name: 'Intel', caption: 'ISEF — 4th, Systems Software, 2016' },
      { key: 'microsoft', name: 'Microsoft', caption: 'College Coding Competition — 2nd' },
      { key: 'unicamp', name: 'UNICAMP', caption: 'Best Undergraduate Research, 2018' },
      { key: 'firstAscent', name: 'First Ascent', caption: 'Top 20 engineers worldwide, 2019' },
    ],
    mentorship: {
      intro:
        '200+ engineers and founders mentored through university, accelerator and mentorship programs.',
      note: 'Also ran programs for junior engineers and young researchers, and judged startup, research and hackathon competitions.',
      photo: {
        src: '/images/mentorship.webp',
        alt: 'Rafael mentoring a startup founder in 2023',
      },
    },
    contact: {
      cta: "Let's build something.",
      linkedin: 'https://www.linkedin.com/in/rafaeleiki/',
      label: { button: 'Connect on LinkedIn', lang: 'Português' },
    },
  },

  pt: {
    meta: {
      htmlLang: 'pt-BR',
      ogLocale: 'pt_BR',
      title: 'Rafael Eiki — Líder de Engenharia',
      description:
        'Head de Engenharia na SuperSummary. Onze anos construindo software e times — de uma startup de EdTech cofundada a uma organização de engenharia com 17 pessoas.',
    },
    ui: {
      status: '// ativo',
      eyebrow: 'sistema: portfólio // online',
      entries: 'registros',
      projects: 'projetos',
      marks: 'marcas',
      selection: 'uma seleção',
      skip: 'Pular para o conteúdo',
      switchTo: 'Mudar idioma para',
      identity: 'R. Eiki Imamura',
      now: 'agora',
      watch: 'Assistir demo',
      close: 'Fechar',
    },
    monogram: 'RE',
    name: ['Rafael', 'Eiki'],
    fullName: 'Rafael Eiki Imamura',
    roles: ['Liderança de Engenharia', 'Ex-fundador de Startup', 'Pesquisador em IHC'],
    now: 'Head de Engenharia · SuperSummary',
    statement:
      'Lidero times de engenharia e continuo escrevendo o código que importa. Onze anos levando produtos do primeiro esboço ao lançamento — como fundador e, agora, liderando uma organização de 17 pessoas em engenharia.',
    nav: { work: 'Trabalho', research: 'Pesquisa', recognition: 'Prêmios', contact: 'Contato' },
    sections: {
      work: 'Trabalho selecionado',
      companies: 'Empresas com que trabalhei',
      projects: 'Projetos independentes',
      research: 'Pesquisa',
      recognition: 'Prêmios e honrarias',
      mentorship: 'Mentoria',
      contact: 'Entre em contato',
    },
    projectsIntro:
      'Projetos pessoais que construí de forma independente, fora do trabalho com clientes.',
    work: [
      {
        role: 'Head de Engenharia',
        company: 'SuperSummary',
        companyNote: 'Lift Ventures',
        period: 'Mar 2026 – Presente',
        summary:
          'Lidero uma organização de engenharia de 17 pessoas, apoiando o desenvolvimento de produtos em diferentes stacks; construí do zero a cultura e os fluxos de IA e de engenharia.',
        stack: ['Next.js', 'Rails', 'Flutter'],
      },
      {
        role: 'Engenheiro de Software III',
        company: 'QuintoAndar',
        period: 'Abr 2021 – Dez 2021',
        summary:
          'Codesenvolvi o modelo de carteiras de imóveis que levou o segmento da menor para a maior taxa de conversão da empresa e multipliquei a disponibilidade de visitas.',
        stack: ['Java', 'React'],
      },
      {
        role: 'Cofundador',
        company: 'Vivros',
        period: 'Dez 2017 – Mar 2021',
        summary:
          'Fundei uma startup de EdTech que produziu livros pop-up interativos com um app de RA, com NPS 90 e um time de sete pessoas.',
        stack: ['Rails', 'React', 'Kotlin'],
      },
    ],
    projects: [
      {
        title: 'Yarner',
        field: 'EdTech',
        year: '2014 – 2016',
        summary:
          'Uma plataforma de livros interativos para escolas que conquistou mais de 20 prêmios, incluindo a Intel ISEF.',
        demo: { type: 'video', src: '/projects/yarner.mp4' },
      },
      {
        title: 'DefenseSnap',
        field: 'Hardware de segurança',
        year: '2017',
        summary:
          'Um wearable de segurança pessoal em formato Moto Mod, com anel Bluetooth e sirene; vencedor do hackathon Mod the Future da Motorola.',
        demo: { type: 'youtube', id: '5UKubnSYDfk' },
      },
      {
        title: 'CooKing',
        field: 'App de consumo',
        year: '2017',
        summary:
          'Um app assistente de cozinha que ajuda da escolha do prato ao preparo; finalista nacional da Imagine Cup 2017.',
        demo: { type: 'video', src: '/projects/cooking.mp4' },
      },
      {
        title: 'PaperPlay',
        field: 'Acessibilidade',
        year: '2018',
        summary:
          'Um kit de programação em papel que permite que jogadores cegos e videntes programem um jogo juntos; vencedor do Hackathon Facebook Brasil.',
        demo: { type: 'video', src: '/projects/paperplay.mp4' },
      },
    ],
    research: {
      intro:
        'Minha pesquisa é em Interação Humano-Computador e EdTech: como pessoas e tecnologia coconstroem significado e como projetar sistemas que sustentem isso.',
      advisor: {
        label: 'Orientado por',
        name: 'M. Cecília C. Baranauskas',
        note: 'Professora titular da UNICAMP, cofundadora do NIED, coautora do primeiro livro de IHC em português e primeira ganhadora do SBC-HCI Career Award e do ACM SIGDOC Rigo Award.',
      },
      papers: [
        {
          title: 'A framework for socio-enactive educational systems: linking learning, design, and technology',
          venue: 'IHC ’19 · ACM',
          href: 'https://doi.org/10.1145/3357155.3358443',
        },
        {
          title: 'Reading as a Collaborative Construction: supporting the design of physico-virtual environments',
          venue: 'TISE ’18 · Nuevas Ideas en Informática Educativa',
          href: 'http://www.tise.cl/Volumen14/TISE2018/249.pdf',
        },
        {
          title:
            'Criando uma experiência de leitura colaborativa de histórias fictícias físico-virtuais com realidade aumentada',
          venue: 'SBIE ’18 · Simpósio Brasileiro de Informática na Educação',
          href: 'http://milanesa.ime.usp.br/rbie/index.php/sbie/article/view/7951',
        },
        {
          title: 'Collaborative reading in the physical-virtual environment',
          venue: 'PIBIC · UNICAMP ’19',
          href: 'https://econtents.sbu.unicamp.br/eventos/index.php/pibic/article/view/1161',
        },
      ],
    },
    recognition: [
      { key: 'facebook', name: 'Facebook', caption: 'Hackathon Brasil — 1º, 2018' },
      { key: 'intel', name: 'Intel', caption: 'ISEF — 4º, Sistemas de Software, 2016' },
      { key: 'microsoft', name: 'Microsoft', caption: 'College Coding Competition — 2º' },
      { key: 'unicamp', name: 'UNICAMP', caption: 'Melhor Iniciação Científica, 2018' },
      { key: 'firstAscent', name: 'First Ascent', caption: 'Top 20 engenheiros do mundo, 2019' },
    ],
    mentorship: {
      intro:
        '200+ engenheiros e fundadores mentorados em programas universitários, aceleradoras e programas de mentoria.',
      note: 'Também conduzi programas para engenheiros júnior e jovens pesquisadores, e avaliei competições de startups, pesquisa e hackathons.',
      photo: {
        src: '/images/mentorship.webp',
        alt: 'Rafael mentorando um fundador de startup em 2023',
      },
    },
    contact: {
      cta: 'Vamos construir algo.',
      linkedin: 'https://www.linkedin.com/in/rafaeleiki/',
      label: { button: 'Conectar no LinkedIn', lang: 'English' },
    },
  },
};
