import { TEXT_COLUMN, IMAGE_COLUMN } from "../grid";

export const PAPERS_GRID = [
  {
    show: true,
    title: 'papers.title',
    columns: [
      {
        type: TEXT_COLUMN,
        experiences: [
          {
            title: 'papers.1.title',
            subtitle: 'papers.1.conference',
            time: 'papers.1.time',
            description: 'papers.1.description',
            long: true,
          },
          {
            title: 'papers.2.title',
            subtitle: 'papers.2.conference',
            time: 'papers.2.time',
            description: 'papers.2.description',
            long: true,
          },
        ]
      },
      {
        type: TEXT_COLUMN,
        experiences: [
          {
            title: 'papers.3.title',
            subtitle: 'papers.3.conference',
            time: 'papers.3.time',
            description: 'papers.3.description',
            long: true,
          },
          {
            title: 'papers.4.title',
            subtitle: 'papers.4.conference',
            time: 'papers.4.time',
            description: 'papers.4.description',
            long: true,
          },
        ]
      },
    ],
  },
  {
    show: false,
    columns: [
      {
        type: IMAGE_COLUMN,
        imageSrc: '/images/research/isef.webp',
        objectPosition: '70%',
        priority: true,
      },
      {
        type: TEXT_COLUMN,
        title: 'initiatives.title',
        experiences: [
          {
            title: 'initiatives.febrace.title',
            subtitle: 'initiatives.febrace.subtitle',
            time: 'initiatives.febrace.time',
            description: 'initiatives.febrace.description',
            imageSrc: '/images/icons/febrace.webp',
          },
          {
            title: 'initiatives.devy.title',
            subtitle: 'initiatives.devy.subtitle',
            time: 'initiatives.devy.time',
            description: 'initiatives.devy.description',
            imageSrc: '/images/icons/devy.webp',
          },
          {
            title: 'initiatives.cientistabeta.title',
            subtitle: 'initiatives.cientistabeta.subtitle',
            time: 'initiatives.cientistabeta.time',
            description: 'initiatives.cientistabeta.description',
            imageSrc: '/images/icons/cientista-beta.webp',
          },
          {
            title: 'initiatives.mostracotuca.title',
            subtitle: 'initiatives.mostracotuca.subtitle',
            time: 'initiatives.mostracotuca.time',
            description: 'initiatives.mostracotuca.description',
            imageSrc: '/images/icons/mostra-tecnica.webp',
          },
        ]
      },
    ]
  },
  {
    show: false,
    title: 'advising.title',
    columns: [
      {
        type: TEXT_COLUMN,
        experiences: [
          {
            title: 'advising.unicamp.title',
            subtitle: 'advising.unicamp.subtitle',
            time: 'advising.unicamp.time',
            description: 'advising.unicamp.description',
          },
        ]
      },
      {
        type: TEXT_COLUMN,
        experiences: [
          {
            title: 'advising.cotuca.title',
            subtitle: 'advising.cotuca.subtitle',
            time: 'advising.cotuca.time',
            description: 'advising.cotuca.description',
          },
        ]
      },
    ]
  },
];
