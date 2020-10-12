import { Injectable } from '@angular/core';
import { BadInputError } from '../common/bad-input-error';
import { NotFoundError } from '../common/not-found-error';
import { AppError } from '../common/app-error';
import { BehaviorSubject } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { course } from './../course.model';

import { catchError, map } from 'rxjs/operators'
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private url = 'http://localhost:3000/courses/';
  updateSingleCourse = new BehaviorSubject<course>(null); 

  constructor(private http: HttpClient) { 

  }
    
  getOneCourse(id){
    this.http.get<course>(this.url + id)
    .subscribe((data) => {
       this.updateSingleCourse.next(data);
    }, error => catchError(this.handleError))
    }

    getCourses(){
      return this.http.get<course[]>(this.url + "list")
      }

  addCourse(course){
   return this.http.post<course>(this.url + "create", course)
  }

  updateCourse(id,body){
   return this.http.patch(this.url + id, body)
  }

  deleteCourse(id){
    return this.http.delete(this.url+'/' + id)
  }

  handleError(error: AppError){
    if(error instanceof BadInputError){
      return throwError(new BadInputError(error));
    }
    else if(error instanceof NotFoundError){
      return throwError(new NotFoundError(error));
    
    }else{
      return throwError(new AppError(error));  
  }
  }
}
