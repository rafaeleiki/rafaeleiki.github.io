import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AcademicComponent } from './academic/academic.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProfessionalComponent } from './professional/professional.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ProjectCardComponent } from './project-card/project-card.component';
import { NewsCardComponent } from './news-card/news-card.component';
import { NewsComponent } from './news/news.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AcademicComponent,
    ProjectsComponent,
    ProfessionalComponent,
    ProjectCardComponent,
    NewsCardComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
