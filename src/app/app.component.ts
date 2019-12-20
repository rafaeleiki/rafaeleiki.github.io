import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {slideInOutAnimation} from './animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    slideInOutAnimation
  ]
})
export class AppComponent {
  title = 'Rafael Eiki';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
