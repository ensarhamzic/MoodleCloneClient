import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course/course.component';
import { CourseListComponent } from './course-list/course-list.component';
import { NewsBoardComponent } from './news-board/news-board.component';
import { NewObavestenjeComponent } from './new-obavestenje/new-obavestenje.component';
import { ObavestenjeComponent } from './obavestenje/obavestenje.component';
import { NewsComponent } from './news/news.component';

@NgModule({
  declarations: [
    CourseComponent,
    CourseListComponent,
    NewsBoardComponent,
    NewObavestenjeComponent,
    ObavestenjeComponent,
    NewsComponent,
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class CourseModule {}