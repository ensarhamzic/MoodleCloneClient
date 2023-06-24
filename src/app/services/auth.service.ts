import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuth } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<IAuth> {
    return this.http.post<IAuth>(`${environment.api_url}/users/login`, {
      username,
      password,
    });
  }

  registerStudent(student: any): Observable<IAuth> {
    return this.http.post<IAuth>(
      `${environment.api_url}/users/register-student`,
      student
    );
  }

  registerTeacher(teacher: any): Observable<IAuth> {
    return this.http.post<IAuth>(
      `${environment.api_url}/users/register-teacher`,
      teacher
    );
  }

  registerAdmin(admin: any): Observable<IAuth> {
    return this.http.post<IAuth>(
      `${environment.api_url}/users/register-admin`,
      admin
    );
  }

  emailTaken(email: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${environment.api_url}/users/email-exists/${email}`
    );
  }

  usernameTaken(username: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${environment.api_url}/users/username-exists/${username}`
    );
  }

  JMBGTaken(jmbg: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${environment.api_url}/users/jmbg-exists/${jmbg}`
    );
  }

  checktoken(token: string): Observable<IAuth> {
    return this.http.get<IAuth>(`${environment.api_url}/users/check-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
