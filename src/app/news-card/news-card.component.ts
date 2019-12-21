import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.sass']
})
export class NewsCardComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() image: string;
  @Input() logo: string;
  @Input() link: string;
  @Input() description: string;
  @Input() time: string;

  constructor() { }

  ngOnInit() {
  }

}
