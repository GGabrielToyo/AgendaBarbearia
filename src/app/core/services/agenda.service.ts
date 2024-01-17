import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Agendamento } from '../types/type';
import { Data } from '@angular/router';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getTodosAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.apiUrl}/agendamentos`);
  }

  getHorariosNaData(data: string): Observable<Agendamento[]> {

    return this.http.get<Agendamento[]>(`${this.apiUrl}/agendamentos/${data}`);
  }
 
  agendarHorario(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(`${this.apiUrl}/agendamentos`, agendamento);
  }

}
