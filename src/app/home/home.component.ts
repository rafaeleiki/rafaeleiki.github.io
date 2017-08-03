import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('menuOpened', [
      state('true', style({ left: 0 })),
      state('false', style({ left: '-100%' })),
      transition('* => *', animate('300ms ease-out')),
    ]),
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
        })
      ),
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate('0.3s ease-in')
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({
          opacity: 0,
        }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  isMenuOpened: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  openMenu() {
    this.isMenuOpened = true;
  }

  closeMenu() {
    this.isMenuOpened = false;
  }

}
