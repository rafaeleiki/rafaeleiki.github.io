import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  menuOpen = false;

  constructor() { }

  ngOnInit() {
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  goToTop() {
    window.scrollTo(0, 0);
  }
}
