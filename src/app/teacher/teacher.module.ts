import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { TeacherRoutingModule } from './teacher-routing.module';
import { CoursesComponent } from './courses/courses.component';
import { NewCourseComponent } from './new-course/new-course.component';

@NgModule({
  declarations: [CoursesComponent, NewCourseComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class TeacherModule {}
