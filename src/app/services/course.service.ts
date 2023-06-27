import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { ISmer } from '../models/smer.module';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
    return this.http.get<any>(`${environment.api_url}/kursevi/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  getNews(kursId: number, numberOfNews?: number): Observable<IObavestenje[]> {
    let url = `${environment.api_url}/obavestenja/kursevi/${kursId}`;
    if (numberOfNews) {
      url += `?num=${numberOfNews}`;
    }
    return this.http.get<IObavestenje[]>(url);
  }

  getNewsById(id: number): Observable<any> {
    return this.http
      .get<any>(`${environment.api_url}/obavestenja/${id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .pipe(
        tap(console.log),
        map((data) => {
          return {
            id: data.id,
            naslov: data.naslov,
            sadrzaj: data.sadrzaj,
            datum: data.datum,
            kurs: data.kurs,
            nastavnik: data.nastavnik,
            studenti:
              (data.studenti &&
                data.studenti.map((s: any) => {
                  return {
                    ...s.student.osoba,
                    datum: s.datum,
                  };
                })) ||
              null,
          };
        })
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

  getMaterijal(materijalId: number): Observable<IMaterijal> {
    return this.http.get<IMaterijal>(
      `${environment.api_url}/kursevi/materijali/${materijalId}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  izbrisiMaterijal(materijalId: number): Observable<IMaterijal> {
    return this.http.delete<IMaterijal>(
      `${environment.api_url}/kursevi/materijali/${materijalId}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  azurirajMaterijal(
    materijalId: number,
    materijal: any
  ): Observable<IMaterijal> {
    const data = new FormData();
    data.append('naziv', materijal.naziv);
    data.append('file', materijal.file);
    return this.http.put<IMaterijal>(
      `${environment.api_url}/kursevi/materijali/${materijalId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  getMaterijalUrl(materijalId: number): Observable<{ url: string }> {
    return this.http.get<{ url: string }>(
      `${environment.api_url}/kursevi/materijali/${materijalId}/pregled`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  getMojiKursevi(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(`${environment.api_url}/kursevi/moji`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
