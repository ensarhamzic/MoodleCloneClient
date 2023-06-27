import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CourseListComponent } from './course-list/course-list.component';
import { NewObavestenjeComponent } from './new-obavestenje/new-obavestenje.component';
import { ObavestenjeComponent } from './obavestenje/obavestenje.component';
import { NewsComponent } from './news/news.component';
import { canManage } from './course.guard';
import { PrijaveComponent } from './prijave/prijave.component';
import { AddMaterialComponent } from './add-material/add-material.component';
import { EditMaterialComponent } from './edit-material/edit-material.component';
import { MojiKurseviComponent } from './moji-kursevi/moji-kursevi.component';

const routes: Routes = [
  {
    path: 'courses',
    component: CourseListComponent,
  },
  {
    path: 'my-courses',
    component: MojiKurseviComponent,
  },
  {
    path: 'courses/:id',
    component: CourseComponent,
  },
  {
    path: 'courses/:id/materijali/:materijalId/edit',
    component: EditMaterialComponent,
    canActivate: [canManage],
  },
  {
    path: 'courses/:id/add-material',
    component: AddMaterialComponent,
    canActivate: [canManage],
  },
  {
    path: 'courses/:id/prijave',
    component: PrijaveComponent,
    canActivate: [canManage],
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
