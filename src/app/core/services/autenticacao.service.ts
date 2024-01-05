import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserService } from './user.service';
import { AuthResponse, DadosAutenticacao } from '../types/type';


@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private userSerive: UserService
  ) { }

  autenticar(dadosAutenticacao: DadosAutenticacao): Observable<HttpResponse<AuthResponse>>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, dadosAutenticacao, { observe: 'response'}).pipe(
      tap((response => {
        const authToken = response.body?.token || '';
        this.userSerive.salvarToken(authToken);
      }))
    );
  }
  
}
