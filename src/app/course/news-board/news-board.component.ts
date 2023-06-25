import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IObavestenje } from 'src/app/models/obavestenje.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-news-board',
  templateUrl: './news-board.component.html',
  styleUrls: ['./news-board.component.scss'],
})
export class NewsBoardComponent {
  @Input() canManage: boolean = false;
  @Input() hasAccess: boolean = false;
  obavestenja: IObavestenje[] = [];

  constructor(
    private http: HttpClient,
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.courseService.getNews(params.id, 5).subscribe((data) => {
        this.obavestenja = data;
      });
    });
  }
}
