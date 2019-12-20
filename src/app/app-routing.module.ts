import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AcademicComponent} from './academic/academic.component';
import {ProjectsComponent} from './projects/projects.component';
import {ProfessionalComponent} from './professional/professional.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { animation: 'Home' } },
  { path: 'academic', component: AcademicComponent, data: { animation: 'Academic' } },
  { path: 'academico', component: AcademicComponent, data: { animation: 'Academic' } },
  { path: 'projects', component: ProjectsComponent, data: { animation: 'Projects' } },
  { path: 'projetos', component: ProjectsComponent, data: { animation: 'Projects' } },
  { path: 'professional', component: ProfessionalComponent, data: { animation: 'Professional' } },
  { path: 'profissional', component: ProfessionalComponent, data: { animation: 'Professional' } },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
