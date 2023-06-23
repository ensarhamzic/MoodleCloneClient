import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  registerStudent(student: any): Observable<any> {
    return this.http.post<any>(
      `${environment.api_url}/users/register-student`,
      student
    );
  }

  registerTeacher(teacher: any): Observable<any> {
    return this.http.post<any>(
      `${environment.api_url}/users/register-teacher`,
      teacher
    );
  }

  registerAdmin(admin: any): Observable<any> {
    return this.http.post<any>(
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
}
