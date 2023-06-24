import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITip } from '../models/tip.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITeacher } from '../models/teacher.model';
import { IStudent } from '../models/student.model';
import { IAuth } from '../models/auth.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { ISmer } from '../models/smer.module';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  token$ = this.store.select((state) => state.auth.token);
  token = '';

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.token$.subscribe((token) => (this.token = token));
  }

  getUnverifiedTeachers(): Observable<ITeacher[]> {
    return this.http.get<ITeacher[]>(
      `${environment.api_url}/users/unverified-teachers`
    );
  }

  getStudents(): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(`${environment.api_url}/users/students`);
  }

  getStudent(jmbg: string): Observable<IStudent> {
    return this.http.get<IStudent>(
      `${environment.api_url}/users/students/${jmbg}`
    );
  }

  getSmerovi(): Observable<ISmer[]> {
    return this.http.get<ISmer[]>(`${environment.api_url}/smerovi`);
  }

  dodajStudentaNaSmer(
    jmbg: string,
    smerId: number,
    brojIndeksa: string
  ): Observable<string> {
    return this.http.post<string>(
      `${environment.api_url}/smerovi`,
      {
        studentJMBG: jmbg,
        smerId,
        brojIndeksa,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  indexTaken = (index: string): Observable<boolean> => {
    return this.http.get<boolean>(
      `${environment.api_url}/smerovi/index-exists/${index}`
    );
  };

  verifyTeacher(jmbg: string): Observable<string> {
    return this.http.post<string>(
      `${environment.api_url}/users/verify-teacher/${jmbg}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  deleteTeacher(jmbg: string): Observable<string> {
    return this.http.delete<string>(
      `${environment.api_url}/users/delete-teacher/${jmbg}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  registerAdmin(admin: any): Observable<IAuth> {
    return this.http.post<IAuth>(
      `${environment.api_url}/users/register-admin`,
      admin
    );
  }
}
