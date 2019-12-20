import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';

const slideTo = (direction, top: any = 0) => [
  query(':leave', [
    style({
      position: 'absolute',
      top,
      left: 0,
      width: '100%',
      height: '100%'
    })
  ]),
  query(':enter', [
    style({ [direction]: '110%', position: 'relative' }),
  ]),
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate('300ms ease-out', style({ opacity: 0 }))
    ]),
    query(':enter', [
      group([
        animate('600ms ease-out', style({ [direction]: 0 })),
      ])
    ])
  ]),
  query(':enter', animateChild()),
];

const homeTop = '24.5%';
const academicTop = '11.5%';
const projectsTop = '16%';
const professionalTop = '0';

export const slideInOutAnimation =
  trigger('routeAnimations', [
    transition('Home => *', slideTo('left', homeTop)),
    transition('Academic => Home', slideTo('right', academicTop)),
    transition('Academic => Projects', slideTo('left', academicTop)),
    transition('Academic => Projects', slideTo('left', academicTop)),
    transition('Projects => Home', slideTo('right', projectsTop)),
    transition('Projects => Academic', slideTo('right', projectsTop)),
    transition('Projects => Professional', slideTo('left', projectsTop)),
    transition('Professional => *', slideTo('right', projectsTop)),
  ]);
