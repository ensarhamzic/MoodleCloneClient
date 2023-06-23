import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IZvanje } from '../models/zvanje.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ZvanjeService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<IZvanje[]> {
    return this.http.get<IZvanje[]>(`${environment.api_url}/zvanja`);
  }

  getOne(id: number): Observable<IZvanje> {
    return this.http.get<IZvanje>(`${environment.api_url}/zvanja/${id}`);
  }
}
