import { TestBed } from '@angular/core/testing';

import { FormularioAgendamentoService } from './formulario-agendamento.service';

describe('FormularioAgendamentoService', () => {
  let service: FormularioAgendamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormularioAgendamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
