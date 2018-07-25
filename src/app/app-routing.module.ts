import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjectComponent} from './project/project.component';
import {HomeComponent} from './home/home.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  {
    path: 'projects/:id',
    component: ProjectComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
