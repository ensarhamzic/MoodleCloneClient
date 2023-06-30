import { Component, Input } from '@angular/core';
import { ISmer } from 'src/app/models/smer.module';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  @Input() smerovi: ISmer[] = [];
  @Input() loading: boolean = true;

  constructor(private courseService: CourseService) {}
}
