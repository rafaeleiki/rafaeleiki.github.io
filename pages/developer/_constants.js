import { TEXT_COLUMN, IMAGE_COLUMN } from "../../components/grid";

export const EXPERIENCE_GRID = [
  {
    show: true,
    columns: [
      {
        type: TEXT_COLUMN,
        experiences: [
          {
            company: 'liftventures',
            imageSrc: '/images/icons/lift-ventures.webp',
          },
          {
            company: 'quintoandar',
            imageSrc: '/images/icons/quintoandar.webp',
          },
          {
            company: 'vivros',
            imageSrc: '/images/icons/vivros.gif',
          },
        ],
      },
      {
        type: IMAGE_COLUMN,
        imageSrc: '/images/experiences/cm20-abertura.webp',
        objectPosition: 'top',
      },
    ],
  },
  {
    show: false,
    columns: [
      {
        type: IMAGE_COLUMN,
        imageSrc: '/images/experiences/microsoft-internship.webp',
        objectPosition: '70% center',
      },
      {
        type: TEXT_COLUMN,
        experiences: [
          {
            company: 'microsoft',
            imageSrc: '/images/icons/microsoft.webp',
          },
          {
            company: 'cientistabeta',
            imageSrc: '/images/icons/cientista-beta.webp',
          },
        ]
      },
    ]
  },
  {
    show: false,
    columns: [
      {
        type: TEXT_COLUMN,
        experiences: [
          {
            company: 'unicamp',
            imageSrc: '/images/icons/unicamp.webp',
          },
          {
            company: 'playkids-ft',
            imageSrc: '/images/icons/playkids.webp',
          },
          {
            company: 'playkids-intern',
            imageSrc: '/images/icons/playkids.webp',
          }
        ]
      },
      {
        type: IMAGE_COLUMN,
        imageSrc: '/images/experiences/ihc2019.webp',
        objectPosition: 'right center',
      },
    ],
  }
];

export const EDUCATION_GRID = [
  {
    show: false,
    columns: [
      {
        type: IMAGE_COLUMN,
        imageSrc: '/images/experiences/fb-hack.webp',
        objectPosition: 'center',
      },
      {
        type: TEXT_COLUMN,
        experiences: [
          {
            company: 'ed-unicamp',
            imageSrc: '/images/icons/unicamp.webp',
          },
          {
            company: 'ed-cotuca',
            imageSrc: '/images/icons/cotuca.webp',
          },
        ]
      },
    ],
  }
];
