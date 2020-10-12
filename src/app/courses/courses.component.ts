import { course } from './../course.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as courseActions from './store/course.actions';
import * as fromStore from '../store/app.reducer';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  deviceInfo = null;
  courses: Observable<course[]>;
  isError: boolean = false;
  showError:string = null;
  
  constructor(private router: Router,
              private store: Store<fromStore.AppState>,
              private deviceService: DeviceDetectorService) { 
              }

   ngOnInit(): void {
    this.deviceInfo = this.deviceService.getDeviceInfo();

    this.store.dispatch(new courseActions.GetCoursesStart());
    this.courses = this.store.select(fromStore.getAllCourses);

    this.store.select(fromStore.getAllAppError).subscribe(appError => {
      if(appError){
        this.isError = true;
        this.showError = appError;
      }
    });
  }

  deleteCourse(index){
    this.store.dispatch(new courseActions.DeleteCourseStart(index))
  }

   updateCourse(courseId){
    this.router.navigate(['/course',courseId])
  }

  createCourse(){
    this.router.navigate(['/courses/create'])
  }

}
