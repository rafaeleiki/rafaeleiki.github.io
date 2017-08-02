import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('menuOpened', [
      state('true', style({ left: 0 })),
      state('false', style({ left: '-100%' })),
      transition('* => *', animate('300ms ease-out')),
    ])
  ]
})
export class AppComponent {
  isMenuOpened = false;

  openMenu() {
    this.isMenuOpened = true;
  }

  closeMenu() {
    this.isMenuOpened = false;
  }
}
