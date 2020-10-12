import { course } from './../../course.model';
import { Action } from '@ngrx/store';

export const ADD_COURSE_START = 'ADD_COURSE_START';
export const ADD_COURSE = 'ADD_COURSE';
export const ADD_COURSE_FAIL = 'ADD_COURSE_FAIL';

export const GET_COURSES_START = 'GET_COURSES_START';
export const GET_COURSES = 'GET_COURSES';
export const GET_COURSES_FAIL = 'GET_COURSES_FAIL';

export const UPDATE_COURSE_START = 'UPDATE_COURSE_START';
export const UPDATE_COURSE = 'UPDATE_COURSE';
export const UPDATE_COURSE_FAIL = 'UPDATE_COURSE_FAIL';

export const DELETE_COURSE_START = 'DELETE_COURSE_START';
export const DELETE_COURSE = 'DELETE_COURSE';
export const DELETE_COURSE_FAIL = 'DELETE_COURSE_FAIL';


export class AddCourseStart implements Action {
    readonly type = ADD_COURSE_START; 
    constructor(public payload: course){}
}

export class AddCourse implements Action {
    readonly type = ADD_COURSE; 
    constructor(public payload: course){}
}

export class AddCourseFail implements Action {
    readonly type = ADD_COURSE_FAIL; 
    constructor(public payload: string){}
}

export class GetCoursesStart implements Action {
    readonly type = GET_COURSES_START; 
    constructor(){}
}

export class GetCourses implements Action {
    readonly type = GET_COURSES; 
    constructor(public payload: course[]){}
}

export class GetCoursesFail implements Action {
    readonly type = GET_COURSES_FAIL; 
    constructor(public payload: string){}
}

export class UpdateCourseStart implements Action {
    readonly type = UPDATE_COURSE_START; 
    constructor(public payload: {_id:number,course: course}){}
}

export class UpdateCourse implements Action {
    readonly type = UPDATE_COURSE; 
    constructor(public payload: {_id:number,course: course}){}
}

export class UpdateCourseFail implements Action {
    readonly type = UPDATE_COURSE_FAIL; 
    constructor(public payload: string){}
}

export class DeleteCourseStart implements Action {
    readonly type = DELETE_COURSE_START; 
    constructor(public payload: number){}
}
export class DeleteCourse implements Action {
    readonly type = DELETE_COURSE; 
    constructor(public payload: number){}
}

export class DeleteCourseFail implements Action {
    readonly type = DELETE_COURSE_FAIL; 
    constructor(public payload: string){}
}



export type courseActions = AddCourse | 
                            AddCourseStart | 
                            AddCourseFail | 
                            DeleteCourse | 
                            DeleteCourseStart |
                            DeleteCourseFail |
                            GetCoursesStart |  
                            GetCourses | 
                            GetCoursesFail | 
                            UpdateCourseStart | 
                            UpdateCourse |
                            UpdateCourseFail;
                            