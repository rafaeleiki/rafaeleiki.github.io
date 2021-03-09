import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';

const homeTop = '10%';
const academicTop = '10%';
const projectsTop = '10%';
const professionalTop = '10%';

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
    transition('Media => Home', slideRightAcademic),
    transition('Media => Academic', slideLeftAcademic),
    transition('Media => Projects', slideLeftAcademic),
    transition('Media => Professional', slideLeftAcademic),
    transition('Academic => Home', slideRightAcademic),
    transition('Academic => Media', slideRightAcademic),
    transition('Academic => Projects', slideLeftAcademic),
    transition('Academic => Professional', slideLeftAcademic),
    transition('Projects => Home', slideRightProjects),
    transition('Projects => Media', slideRightProjects),
    transition('Projects => Academic', slideRightProjects),
    transition('Projects => Professional', slideLeftProjects),
    transition('Professional => *', slideRightProfessional),
  ]);
