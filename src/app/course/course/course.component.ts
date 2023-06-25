import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ICourse } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent {
  course!: ICourse;
  canManage: boolean = false;
  pending: boolean = false;
  loading: boolean = true;
  prijavljivanje: boolean = false;
  error: boolean = false;
  loggedIn$ = this.store.select((state) => state.auth.loggedIn);
  loggedIn: boolean = false;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.loggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
    this.route.params.subscribe((params) => {
      this.courseService.getCourseById(params.id).subscribe({
        next: (data) => {
          console.log('data', data);
          this.course = data.kurs;
          this.canManage = data.canManage;
          this.pending = data.pending;
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

  prijaviSeNaKurs = () => {
    if (this.loggedIn) {
      this.prijavljivanje = true;
      this.courseService.prijaviSeNaKurs(this.course.id).subscribe(() => {
        this.pending = !this.pending;
        if (this.pending)
          this.toastr.success('Uspešno ste se prijavili na kurs.');
        else this.toastr.success('Uspešno ste odjavili kurs.');
        this.prijavljivanje = false;
      });
    } else {
      this.router.navigate(['/login']);
    }
  };
}
