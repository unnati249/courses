// import { environment } from './../environments/environment';
import { environment } from './../environments/environment.prod';

import { CourseService } from './services/course.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { UpdateCourseComponent } from './courses/update-course/update-course.component';
import { AppErrorHandler } from './common/app-error-handler';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateCourseComponent } from './courses/create-course/create-course.component';
import { reducers } from './store/app.reducer';
import { CoursesEffects } from './courses/store/course.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    UpdateCourseComponent,
    CreateCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreModule.forFeature('courses',reducers),
    EffectsModule.forRoot([CoursesEffects]),
    StoreDevtoolsModule.instrument({logOnly:environment.production}),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    
  ],
  providers: [
    CourseService,
    {provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
