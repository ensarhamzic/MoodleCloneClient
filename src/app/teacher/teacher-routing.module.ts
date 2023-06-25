import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { isProfesor, isTeacher } from './teacher.guard';

const routes: Routes = [
  {
    path: 'teacher',
    canActivate: [isTeacher],
    children: [
      { path: 'courses', component: CoursesComponent },
      {
        path: 'new-course',
        component: NewCourseComponent,
        canActivate: [isProfesor],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
