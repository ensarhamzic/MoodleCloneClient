import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IObavestenje } from 'src/app/models/obavestenje.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-obavestenje',
  templateUrl: './obavestenje.component.html',
  styleUrls: ['./obavestenje.component.scss'],
})
export class ObavestenjeComponent {
  obavestenje!: IObavestenje;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.courseService.getNewsById(params.newsId).subscribe((data) => {
        console.log('data', data);
        this.obavestenje = data;
      });
    });
  }
}
