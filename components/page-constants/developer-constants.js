import { TEXT_COLUMN, IMAGE_COLUMN } from "../grid";

const createExperience = (name) => ({
  title: `${name}.title`,
  subtitle: `${name}.company`,
  time: `${name}.time`,
  description: `${name}.description`,
});

export const EXPERIENCE_GRID = [
  {
    show: true,
    columns: [
      {
        type: TEXT_COLUMN,
        title: 'experiences.title',
        experiences: [
          {
            ...createExperience('experiences.liftventures'),
            imageSrc: '/images/icons/lift-ventures.webp',
          },
          {
            ...createExperience('experiences.quintoandar'),
            imageSrc: '/images/icons/quintoandar.webp',
          },
          {
            ...createExperience('experiences.vivros'),
            imageSrc: '/images/icons/vivros.gif',
          },
        ],
      },
      {
        type: IMAGE_COLUMN,
        imageSrc: '/images/experiences/cm20-abertura.webp',
        objectPosition: 'top',
        priority: true,
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
        priority: true,
      },
      {
        type: TEXT_COLUMN,
        experiences: [
          {
            ...createExperience('experiences.microsoft'),
            imageSrc: '/images/icons/microsoft.webp',
          },
          {
            ...createExperience('experiences.cientistabeta'),
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
            ...createExperience('experiences.unicamp'),
            imageSrc: '/images/icons/unicamp.webp',
          },
          {
            ...createExperience('experiences.playkids-ft'),
            imageSrc: '/images/icons/playkids.webp',
          },
          {
            ...createExperience('experiences.playkids-intern'),
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
        title: 'education.title',
        experiences: [
          {
            ...createExperience('education.ed-unicamp'),
            imageSrc: '/images/icons/unicamp.webp',
          },
          {
            ...createExperience('education.ed-cotuca'),
            imageSrc: '/images/icons/cotuca.webp',
          },
        ]
      },
    ],
  }
];
