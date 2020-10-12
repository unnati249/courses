import { course } from './../../course.model';
import * as courseActions from './course.actions';

export interface CourseState{
     courses : course[],
     appError : string
}
   
const initialState : CourseState = {
    courses : [],
    appError : null
};
export function courseReducer(state : CourseState = initialState, action: courseActions.courseActions){
    switch(action.type){
        case courseActions.ADD_COURSE:
            return {
                courses: [...state.courses, action.payload],
                appError : null
            };
        case courseActions.ADD_COURSE_START:
            return {
                courses: [...state.courses],
                appError : null
            };
        case courseActions.ADD_COURSE_FAIL: 
            return {
                courses: [...state.courses],
                appError : action.payload              
            };
        
            case courseActions.GET_COURSES_START:
                return {
                    courses: [...state.courses],
                    appError : null  
                };

            case courseActions.GET_COURSES:
                {
                return {
                courses: [...action.payload],
                appError : null                    
                   
                };
            }
            case courseActions.GET_COURSES_FAIL: 
            return {
                courses: [...state.courses],
                appError : action.payload               
            };
            case courseActions.UPDATE_COURSE_START: 
                return {
                    courses : [...state.courses],
                    appError : null
                };

            case courseActions.UPDATE_COURSE:

                const updatedCourses = [...state.courses];
                let objIndex = updatedCourses.findIndex((obj => obj._id == action.payload._id));
                updatedCourses[objIndex] = action.payload.course
                return {
                    courses: [...updatedCourses],
                    appError : null
                };

            case courseActions.UPDATE_COURSE_FAIL:
                return {
                    courses: [...state.courses],
                    appError : action.payload
                }
            
             case courseActions.DELETE_COURSE_START:
                return {
                    courses: [...state.courses],
                    appError : null
                };    

            case courseActions.DELETE_COURSE:
                const coursesRemaining = [...state.courses];
                return {
                    courses: coursesRemaining.filter((cs,csIndex) => {
                        return cs._id != action.payload;
                    }),
                    appError : null
                };
                case courseActions.DELETE_COURSE_FAIL: 
                return {
                    courses: [...state.courses],
                    appError : action.payload               
                };
         
        default: 
            return state;
    }
}

export const selectCourses = (state: CourseState) => state.courses;
export const selectAppError = (state: CourseState) => state.appError;

 