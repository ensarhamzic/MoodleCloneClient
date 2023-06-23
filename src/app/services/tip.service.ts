import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITip } from '../models/tip.model';

@Injectable({
  providedIn: 'root',
})
export class TipService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ITip[]> {
    return this.http.get<ITip[]>(`${environment.api_url}/tipovi`);
  }

  getOne(id: number): Observable<ITip> {
    return this.http.get<ITip>(`${environment.api_url}/tipovi/${id}`);
  }
}
