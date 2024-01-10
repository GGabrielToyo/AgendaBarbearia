import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Pageable } from '../types/type';

@Injectable({
  providedIn: 'root'
})
export class BarbeiroService {

  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  getBarbeiros(): Observable<Pageable> {
    return this.http.get<Pageable>(`${this.apiUrl}/barbeiro`);
  }
}
