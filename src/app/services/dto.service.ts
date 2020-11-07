import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dto } from '../models/dto';
import { Observable } from 'rxjs';

const url = '/dtos';

@Injectable({
  providedIn: 'root'
})
export class DtoService {

  constructor(
    private http: HttpClient
  ) { }

  create(payload: Dto): Observable<Dto> {
    return this.http.post(url, payload) as Observable<Dto>;
  }

  get(): Observable<[]> {
    return this.http.get(url) as Observable<[]>;
  }
}
