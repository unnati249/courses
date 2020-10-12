import { Component, OnInit } from '@angular/core';
import { CourseService } from './../../services/course.service';
import {  Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { course } from '../../course.model';
import * as courseActions from '../store/course.actions';
import * as fromStore from '../../store/app.reducer';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

  courses: course[];
  deviceInfo = null;
  isError: boolean = false;
  showError: string = null;

  form = new FormGroup({
    courseName: new FormControl('',[Validators.required]),
    courseId:new FormControl('',Validators.required),
    courseDuration: new FormControl(''),
    courseFee:new FormControl('',Validators.required)
  })

  constructor(private courseService: CourseService, 
              private router:Router,
              private store: Store<fromStore.AppState>,
              private deviceService : DeviceDetectorService) { }

  ngOnInit(): void {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    
    this.store.select(fromStore.getAllAppError).subscribe(appError => {
      if(appError){
        this.isError = true;
        this.showError = appError;
      }
    });
    
  }

  addCourse(){
    console.log(this.form.value);
    this.store.dispatch(new courseActions.AddCourseStart(this.form.value));
  
  }
 
  get courseName(){
    return this.form.get('courseName');
  }

  get courseId(){
    return this.form.get('courseId');
  }
  get courseFee(){
    return this.form.get('courseFee');
  }
}
