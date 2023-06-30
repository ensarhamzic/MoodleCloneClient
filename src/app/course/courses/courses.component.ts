import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ISmer } from 'src/app/models/smer.module';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  smerovi: ISmer[] = [];
  loading: boolean = true;

  query$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private courseService: CourseService) {
    this.query$
      .pipe(
        switchMap((query) => {
          return this.courseService.getSmeroviSaKursevima(query);
        })
      )
      .subscribe((smerovi) => {
        this.smerovi = smerovi;
        this.loading = false;
      });
  }

  searchHandler(query: string) {
    this.query$.next(query);
  }
}
