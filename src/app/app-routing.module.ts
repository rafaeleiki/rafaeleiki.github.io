import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AcademicComponent} from './academic/academic.component';
import {ProjectsComponent} from './projects/projects.component';
import {ProfessionalComponent} from './professional/professional.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'academic', component: AcademicComponent },
  { path: 'academico', component: AcademicComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projetos', component: ProjectsComponent },
  { path: 'professional', component: ProfessionalComponent },
  { path: 'profissional', component: ProfessionalComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
