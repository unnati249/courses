import * as fromCourses from '../courses/store/course.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppState {
    course: fromCourses.CourseState;
  }

export const reducers: ActionReducerMap<AppState> = {
    course: fromCourses.courseReducer
}

export const getAppState = createFeatureSelector<AppState>('courses');

export const getCourseState = createSelector(getAppState,(state: AppState)=> state.course);

export const getAllCourses = createSelector(getCourseState, fromCourses.selectCourses)
export const getAllAppError = createSelector(getCourseState, fromCourses.selectAppError)