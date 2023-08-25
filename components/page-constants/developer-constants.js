import { TEXT_COLUMN, IMAGE_COLUMN } from "../grid";
import { createWorkExperience } from "./create-experience";

export const EXPERIENCE_GRID = [
  {
    show: true,
    columns: [
      {
        type: TEXT_COLUMN,
        title: 'experiences.title',
        experiences: [
          {
            ...createWorkExperience('experiences.liftventures'),
            imageSrc: '/images/icons/lift-ventures.webp',
          },
          {
            ...createWorkExperience('experiences.campusmobile'),
            imageSrc: '/images/icons/instituto-claro.webp',
          },
          {
            ...createWorkExperience('experiences.quintoandar'),
            imageSrc: '/images/icons/quintoandar.webp',
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
        objectPosition: '50% center',
        priority: true,
      },
      {
        type: TEXT_COLUMN,
        experiences: [
          {
            ...createWorkExperience('experiences.vivros'),
            imageSrc: '/images/icons/vivros.gif',
          },
          {
            ...createWorkExperience('experiences.microsoft'),
            imageSrc: '/images/icons/microsoft.webp',
          },
          {
            ...createWorkExperience('experiences.cientistabeta'),
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
            ...createWorkExperience('experiences.unicamp'),
            imageSrc: '/images/icons/unicamp.webp',
          },
          {
            ...createWorkExperience('experiences.playkids-ft'),
            imageSrc: '/images/icons/playkids.webp',
          },
          {
            ...createWorkExperience('experiences.playkids-intern'),
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
            ...createWorkExperience('education.ed-unicamp'),
            imageSrc: '/images/icons/unicamp.webp',
          },
          {
            ...createWorkExperience('education.ed-cotuca'),
            imageSrc: '/images/icons/cotuca.webp',
          },
        ]
      },
    ],
  }
];
