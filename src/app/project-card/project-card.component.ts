import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.sass']
})
export class ProjectCardComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() duration: string;
  @Input() imageUrl: string;
  @Input() projectLogoUrl: string;
  @Input() videoUrl: string;
  @Input() content: string;

  constructor() { }

  ngOnInit() {
  }

}
