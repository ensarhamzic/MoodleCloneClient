import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IStudent } from 'src/app/models/student.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-studenti',
  templateUrl: './studenti.component.html',
  styleUrls: ['./studenti.component.scss'],
})
export class StudentiComponent {
  studenti: IStudent[] = [];
  loading: boolean = true;
  query$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private adminService: AdminService) {
    this.query$
      .pipe(
        switchMap((query) => {
          return this.adminService.getStudents(query);
        })
      )
      .subscribe((smerovi) => {
        this.studenti = smerovi;
        this.loading = false;
      });
  }

  searchHandler(query: string) {
    this.query$.next(query);
  }
}
