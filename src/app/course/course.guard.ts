import { inject } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
} from '@angular/router';
import { CourseService } from '../services/course.service';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

export const canManage: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const courseService = inject(CourseService);
  const courseId = route.params.id;
  courseService.getCourseById(courseId).subscribe((data) => {
    console.log(data);
    if (!data.canManage) {
      router.navigate(['/']);
    }
  });
  return true;
};

export const isStudent: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store<AppState>);
  store
    .select((state) => state.auth.role)
    .subscribe((role) => {
      if (role !== 'Student') {
        router.navigate(['/']);
      }
    });
  return true;
};
