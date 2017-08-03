import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {ProjectService} from './project.service';
import {Project} from './project';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          transform: 'scale(1)',
        })
      ),
      transition(':enter', [
        style({
          transform: 'scale(0)',
        }),
        animate('0.3s ease-in-out')
      ]),
    ])
  ]
})
export class ProjectComponent implements OnInit {

  @Input() project: Project;
  @HostBinding('@routeAnimation') routeAnimation = true;

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.projectService.getProject(params['id']))
      .subscribe((project) => this.project = project);
  }
}
