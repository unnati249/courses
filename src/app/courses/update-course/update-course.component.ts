import { CourseService } from './../../services/course.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { course } from '../../course.model';
import { Subscription } from 'rxjs';
import * as courseActions from '../store/course.actions';
import * as fromStore from '../../store/app.reducer'


@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.scss']
})
export class UpdateCourseComponent implements OnInit, OnDestroy {
  
   isError: boolean = false;
   showError: string = null;
   courseID;
   currentCourse: course;

   form = new FormGroup({
    _id: new FormControl(''),
    courseName: new FormControl('',[Validators.required]),
    courseId:new FormControl('',Validators.required),
    courseDuration: new FormControl(''),
    courseFee:new FormControl('',Validators.required),
    __v:new FormControl('')
   
  })

  constructor(private activeRoute: ActivatedRoute, 
              private courseService: CourseService, 
              private router:Router, 
              private store: Store<fromStore.AppState>) { }
    
              private SubscribeToCourse : Subscription;

  ngOnInit(): void {
   
    this.activeRoute.params.subscribe((params: Params) => {
      this.courseID = params['courseId'];
    })

    this.courseService.getOneCourse(this.courseID);
    this.SubscribeToCourse = this.courseService.updateSingleCourse.subscribe((data)=>{
      this.currentCourse = data;
    });

    this.store.select(fromStore.getAllAppError).subscribe(appError => {
      if(appError){
        this.isError = true;
        console.log(appError)
        this.showError = appError;
      }
    });
  }
  
  updateCourse(){
    this.store.dispatch(new courseActions.UpdateCourseStart({_id: this.courseID, course: this.form.value}))
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
  ngOnDestroy(): void {
    this.SubscribeToCourse.unsubscribe();
  }
}
