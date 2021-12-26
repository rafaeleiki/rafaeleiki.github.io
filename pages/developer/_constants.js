export const TEXT_COLUMN = 1;
export const IMAGE_COLUMN = 2;

export const EXPERIENCE_GRID = [
  [
    {
      type: TEXT_COLUMN,
      experiences: [
        {
          company: 'liftventures',
          imageSrc: '/images/lift-ventures.webp',
        },
        {
          company: 'quintoandar',
          imageSrc: '/images/quintoandar.webp',
        },
        {
          company: 'vivros',
          imageSrc: '/images/vivros.gif',
        },
      ],
    },
    {
      type: IMAGE_COLUMN,
      imageSrc: '/images/cm20-abertura.webp',
      objectPosition: 'top',
    },
  ],
  [
    {
      type: IMAGE_COLUMN,
      imageSrc: '/images/microsoft-internship.webp',
      objectPosition: 'center',
    },
    {
      type: TEXT_COLUMN,
      experiences: [
        {
          company: 'microsoft',
          imageSrc: '/images/microsoft.webp',
        },
        {
          company: 'cientistabeta',
          imageSrc: '/images/cientista-beta.webp',
        },
      ]
    },
  ],
  [
    {
      type: TEXT_COLUMN,
      experiences: [
        {
          company: 'unicamp',
          imageSrc: '/images/unicamp.webp',
        },
        {
          company: 'playkids-ft',
          imageSrc: '/images/playkids.webp',
        },
        {
          company: 'playkids-intern',
          imageSrc: '/images/playkids.webp',
        }
      ]
    },
    {
      type: IMAGE_COLUMN,
      imageSrc: '/images/ihc2019.webp',
      objectPosition: 'center',
    },
  ],
];

export const EDUCATION_GRID = [
  [
    {
      type: IMAGE_COLUMN,
      imageSrc: '/images/fb-hack.webp',
      objectPosition: 'center',
    },
    {
      type: TEXT_COLUMN,
      experiences: [
        {
          company: 'ed-unicamp',
          imageSrc: '/images/unicamp.webp',
        },
        {
          company: 'ed-cotuca',
          imageSrc: '/images/cotuca.webp',
        },
      ]
    },
  ]
];
