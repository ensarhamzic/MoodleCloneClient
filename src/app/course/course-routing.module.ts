import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CourseListComponent } from './course-list/course-list.component';

const routes: Routes = [
  {
    path: 'courses',
    component: CourseListComponent,
  },
  {
    path: 'courses/:id',
    component: CourseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}
