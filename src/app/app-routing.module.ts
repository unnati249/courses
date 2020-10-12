import { CoursesComponent } from './courses/courses.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateCourseComponent } from './courses/update-course/update-course.component';
import { CreateCourseComponent } from './courses/create-course/create-course.component';

const routes: Routes = [

  {path:'course/:courseId', component : UpdateCourseComponent},
  {path:'courses/create', component : CreateCourseComponent},
  {path:'courses', component : CoursesComponent},
  {path:'', component : CoursesComponent, pathMatch:"full"},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
