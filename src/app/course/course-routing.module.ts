import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CourseListComponent } from './course-list/course-list.component';
import { NewObavestenjeComponent } from './new-obavestenje/new-obavestenje.component';
import { ObavestenjeComponent } from './obavestenje/obavestenje.component';
import { NewsComponent } from './news/news.component';
import { canManage } from './course.guard';

const routes: Routes = [
  {
    path: 'courses',
    component: CourseListComponent,
  },
  {
    path: 'courses/:id',
    component: CourseComponent,
  },
  {
    path: 'courses/:id/news/add',
    component: NewObavestenjeComponent,
    canActivate: [canManage],
  },
  {
    path: 'courses/:id/news/:newsId',
    component: ObavestenjeComponent,
  },
  {
    path: 'courses/:id/news',
    component: NewsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}
