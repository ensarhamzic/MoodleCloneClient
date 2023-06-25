import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IObavestenje } from 'src/app/models/obavestenje.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent {
  obavestenja: IObavestenje[] = [];

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.courseService.getNews(params.id).subscribe((data) => {
        this.obavestenja = data;
      });
    });
  }
}
