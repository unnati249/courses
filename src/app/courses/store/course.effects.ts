import { CourseService } from './../../services/course.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as courseActions from './course.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CoursesEffects{
    private url = 'http://localhost:3000/courses/';
    @Effect()
    CourseAdd = this.action$.pipe(
        ofType(courseActions.ADD_COURSE_START),
        switchMap((courseData:courseActions.AddCourseStart) => {
            return this.courseService.addCourse(courseData.payload)
            .pipe(
                map(response => {
                    return new courseActions.AddCourse(response);
                }),
                catchError(error => {
                    return of(new courseActions.AddCourseFail(error));
                })
            
            );
        }),

    );

    @Effect()
    CourseUpdate = this.action$.pipe(
        ofType(courseActions.UPDATE_COURSE_START),
        switchMap((courseData:courseActions.UpdateCourseStart) => {
            return this.courseService.updateCourse(courseData.payload._id,courseData.payload.course)
            .pipe(
                map(response => {
                    return new courseActions.UpdateCourse(courseData.payload);
                 }),
                catchError(error => {
                    return of(new courseActions.UpdateCourseFail(error));
                })
            
            );
        }),

    );

    @Effect() 
    CourseFetch = this.action$.pipe(
    ofType(courseActions.GET_COURSES_START),
    switchMap(() => {
        return this.courseService.getCourses()
        .pipe(
        map(response => {return new courseActions.GetCourses(response)}),
        catchError(error => {
            return of(new courseActions.GetCoursesFail(error));
        })
        );
    }));

    @Effect() 
    CourseDelete = this.action$.pipe(
    ofType(courseActions.DELETE_COURSE_START),
    switchMap((courseData:courseActions.DeleteCourseStart) => {
        return this.courseService.deleteCourse(courseData.payload)
        .pipe(
        map(response => {return new courseActions.DeleteCourse(courseData.payload)}),
        catchError(error => {
            return of(new courseActions.DeleteCourseFail(error));
        })
        );
    }));
    
    @Effect({dispatch:false})
    courseAddSuccess = this.action$.pipe(
        ofType(courseActions.ADD_COURSE),
        tap(() => {
            this.router.navigate(['/']);
        })
    )

    @Effect({dispatch:false})
    courseUpdateSuccess = this.action$.pipe(
        ofType(courseActions.UPDATE_COURSE),
        tap(() => {
            this.router.navigate(['/']);
        })
    )

    constructor(private action$: Actions, private http: HttpClient, private router:Router, private courseService :CourseService){}
}