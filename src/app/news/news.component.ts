import { Component, OnInit, Input } from '@angular/core';
import NEWS from "./news";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent implements OnInit {

  @Input() limit: number;
  news: any;

  constructor() {}

  ngOnInit() {
    this.news = NEWS;

    if (this.limit && this.limit > 0) {
      this.news = NEWS.splice(0, this.limit);
    }
  }

}
