import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISmer } from '../models/smer.module';
import { environment } from 'src/environments/environment';
import { ITeacher } from '../models/teacher.model';
import { ICourse } from '../models/course.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  token$ = this.store.select((state) => state.auth.token);
  token = '';

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.token$.subscribe((token) => (this.token = token));
  }

  getSmerovi(): Observable<ISmer[]> {
    return this.http.get<ISmer[]>(`${environment.api_url}/smerovi`);
  }

  getAsistenti(): Observable<ITeacher[]> {
    return this.http.get<ITeacher[]>(`${environment.api_url}/users/asistenti`);
  }

  addCourse(course: any): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/kursevi`, course, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  getCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(`${environment.api_url}/kursevi/me`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
