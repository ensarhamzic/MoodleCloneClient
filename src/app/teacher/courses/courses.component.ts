import { Component } from '@angular/core';
import { ICourse } from 'src/app/models/course.model';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courses: ICourse[] = [];

  constructor(private teacherService: TeacherService) {
    this.teacherService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }
}
