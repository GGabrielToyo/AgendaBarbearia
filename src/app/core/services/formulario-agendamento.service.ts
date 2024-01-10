import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormularioAgendamentoService {

  formAgendamento: FormGroup | null = null;

  constructor() { }

  getAgendamento():FormGroup | null {
    return this.formAgendamento;
  }

  setAgendamento(form: FormGroup){
    this.formAgendamento = form;
  }
}
