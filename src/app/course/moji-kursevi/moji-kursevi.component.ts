import { Component } from '@angular/core';
import { ICourse } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-moji-kursevi',
  templateUrl: './moji-kursevi.component.html',
  styleUrls: ['./moji-kursevi.component.scss'],
})
export class MojiKurseviComponent {
  kursevi: ICourse[] = [];
  loading: boolean = true;

  constructor(private courseService: CourseService) {
    this.courseService.getMojiKursevi().subscribe((data) => {
      this.kursevi = data;
      this.loading = false;
    });
  }
}
