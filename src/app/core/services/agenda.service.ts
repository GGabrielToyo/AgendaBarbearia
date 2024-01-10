import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Agendamento } from '../types/type';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getTodosAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.apiUrl}/agendamentos/`);
  }

  getHorariosNaData(data: Date): Observable<Agendamento[]> {
    const dataFormatada = data.toISOString();
    return this.http.get<Agendamento[]>(`${this.apiUrl}/agendamentos/${dataFormatada}`);
  }
}
