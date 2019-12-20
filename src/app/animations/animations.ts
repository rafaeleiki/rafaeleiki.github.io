import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';

const homeTop = '24.5%';
const academicTop = '11.5%';
const projectsTop = '16%';
const professionalTop = '0';

const slideLeftHome = [
  query(':leave', [
    style({
      position: 'absolute',
      top: homeTop,
      left: 0,
      width: '100%',
      height: '100%'
    })
  ]),
  query(':enter', [
    style({ left: '110%', position: 'relative' }),
  ]),
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate('300ms ease-out', style({ opacity: 0 }))
    ]),
    query(':enter', [
      group([
        animate('600ms ease-out', style({ left: 0 })),
      ])
    ])
  ]),
  query(':enter', animateChild()),
];

export const slideRightAcademic = [
  query(':leave', [
    style({
      position: 'absolute',
      top: academicTop,
      left: 0,
      width: '100%',
      height: '100%'
    })
  ]),
  query(':enter', [
    style({ right: '110%', position: 'relative' }),
  ]),
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate('300ms ease-out', style({ opacity: 0 }))
    ]),
    query(':enter', [
      group([
        animate('600ms ease-out', style({ right: 0 })),
      ])
    ])
  ]),
  query(':enter', animateChild()),
];

export const slideLeftAcademic = [
  query(':leave', [
    style({
      position: 'absolute',
      top: academicTop,
      left: 0,
      width: '100%',
      height: '100%'
    })
  ]),
  query(':enter', [
    style({ left: '110%', position: 'relative' }),
  ]),
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate('300ms ease-out', style({ opacity: 0 }))
    ]),
    query(':enter', [
      group([
        animate('600ms ease-out', style({ left: 0 })),
      ])
    ])
  ]),
  query(':enter', animateChild()),
];

export const slideLeftProjects = [
  query(':leave', [
    style({
      position: 'absolute',
      top: projectsTop,
      left: 0,
      width: '100%',
      height: '100%'
    })
  ]),
  query(':enter', [
    style({ left: '110%', position: 'relative' }),
  ]),
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate('300ms ease-out', style({ opacity: 0 }))
    ]),
    query(':enter', [
      group([
        animate('600ms ease-out', style({ left: 0 })),
      ])
    ])
  ]),
  query(':enter', animateChild()),
];

export const slideRightProjects = [
  query(':leave', [
    style({
      position: 'absolute',
      top: projectsTop,
      left: 0,
      width: '100%',
      height: '100%'
    })
  ]),
  query(':enter', [
    style({ right: '110%', position: 'relative' }),
  ]),
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate('300ms ease-out', style({ opacity: 0 }))
    ]),
    query(':enter', [
      group([
        animate('600ms ease-out', style({ right: 0 })),
      ])
    ])
  ]),
  query(':enter', animateChild()),
];

export const slideRightProfessional = [
  query(':leave', [
    style({
      position: 'absolute',
      top: professionalTop,
      left: 0,
      width: '100%',
      height: '100%'
    })
  ]),
  query(':enter', [
    style({ right: '110%', position: 'relative' }),
  ]),
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate('300ms ease-out', style({ opacity: 0 }))
    ]),
    query(':enter', [
      group([
        animate('600ms ease-out', style({ right: 0 })),
      ])
    ])
  ]),
  query(':enter', animateChild()),
];

export const slideInOutAnimation =
  trigger('routeAnimations', [
    transition('Home => *', slideLeftHome),
    transition('Academic => Home', slideRightAcademic),
    transition('Academic => Projects', slideLeftAcademic),
    transition('Academic => Projects', slideLeftAcademic),
    transition('Projects => Home', slideRightProjects),
    transition('Projects => Academic', slideRightProjects),
    transition('Projects => Professional', slideLeftProjects),
    transition('Professional => *', slideRightProfessional),
  ]);
