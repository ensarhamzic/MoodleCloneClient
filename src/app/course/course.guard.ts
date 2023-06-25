import { inject } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
} from '@angular/router';
import { CourseService } from '../services/course.service';

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
