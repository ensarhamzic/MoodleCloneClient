import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { ISmer } from '../models/smer.module';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICourse } from '../models/course.model';
import { IObavestenje } from '../models/obavestenje.model';
import { IStudent } from '../models/student.model';
import { IMaterijal } from '../models/materijal.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  token$ = this.store.select((state) => state.auth.token);
  token = '';

  constructor(private store: Store<AppState>, private http: HttpClient) {
    this.token$.subscribe((token) => (this.token = token));
  }

  getSmeroviSaKursevima(): Observable<ISmer[]> {
    return this.http.get<ISmer[]>(`${environment.api_url}/smerovi`);
  }

  getCourseById(id: number): Observable<any> {
    console.log(this.token);
    return this.http.get<any>(`${environment.api_url}/kursevi/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  getNews(kursId: number, numberOfNews?: number): Observable<IObavestenje[]> {
    var url = `${environment.api_url}/obavestenja/kursevi/${kursId}`;
    if (numberOfNews) {
      url += `?num=${numberOfNews}`;
    }
    return this.http.get<IObavestenje[]>(url);
  }

  getNewsById(id: number): Observable<IObavestenje> {
    return this.http.get<IObavestenje>(
      `${environment.api_url}/obavestenja/${id}`
    );
  }

  addNews(news: any): Observable<IObavestenje> {
    return this.http.post<IObavestenje>(
      `${environment.api_url}/obavestenja`,
      news,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  prijaviSeNaKurs(kursId: number): Observable<any> {
    return this.http.post<any>(
      `${environment.api_url}/kursevi/${kursId}/prijava`,
      {},
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  getPrijaveNaKurs(kursId: number): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(
      `${environment.api_url}/kursevi/${kursId}/prijave`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  odgovoriNaPrijavu(
    kursId: number,
    studentJMBG: string,
    prihvacena: boolean
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.api_url}/kursevi/${kursId}/prijave`,
      {
        studentJMBG,
        prihvacena,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  dodajMaterijal(kursId: number, materijal: any): Observable<IMaterijal> {
    const data = new FormData();
    data.append('naziv', materijal.naziv);
    data.append('file', materijal.file);
    return this.http.post<IMaterijal>(
      `${environment.api_url}/kursevi/${kursId}/materijali`,
      data,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }
}
