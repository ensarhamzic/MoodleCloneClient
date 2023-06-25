import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isTeacher } from './teacher.guard';
import { CoursesComponent } from './courses/courses.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { CourseComponent } from './course/course.component';

const routes: Routes = [
  {
    path: 'teacher',
    canActivate: [isTeacher],
    children: [
      { path: 'courses', component: CoursesComponent },
      { path: 'new-course', component: NewCourseComponent },
      { path: 'courses/:id', component: CourseComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
