import { Injectable } from '@angular/core';
import {PROJECTS} from './project.data';
import {Project} from './project';

@Injectable()
export class ProjectService {

  constructor() { }

  getProjects(): Promise<Project[]> {
    return Promise.resolve(PROJECTS);
  }

  getProject(id: string): Promise<Project> {
    return this.getProjects()
      .then((projects) => projects.find((project) => project.id === id));
  }

}
