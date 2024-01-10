import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormularioAgendamentoService {

  formAgendamento: FormGroup | null = null;

  constructor() { }

  getCadastro():FormGroup | null {
    return this.formAgendamento;
  }

  setCadastro(form: FormGroup){
    this.formAgendamento = form;
  }
}
