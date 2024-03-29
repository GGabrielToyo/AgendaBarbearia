import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Usuario } from '../types/type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private apiUrl = environment.apiUrl;
  usuario!: Usuario;

  constructor(private http: HttpClient) { }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/usuario/cadastrar`, usuario);
  }

  buscarUsuario():Observable<Usuario>{
    return this.http.get<Usuario>(`${this.apiUrl}/usuario/perfil`);
  }

  editarUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.patch<Usuario>(`${this.apiUrl}/usuario`, usuario);
  }

}
