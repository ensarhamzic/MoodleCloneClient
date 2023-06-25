import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent {
  course!: ICourse;
  canManage: boolean = false;
  loading: boolean = true;
  error: boolean = false;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.courseService.getCourseById(params.id).subscribe({
        next: (data) => {
          this.course = data.kurs;
          this.canManage = data.canManage;
          this.loading = false;
          this.error = false;
        },
        error: () => {
          this.loading = false;
          this.error = true;
        },
      });
    });
  }
}
