import { Component, OnInit } from '@angular/core';
import { AgendaService } from 'src/app/core/services/agenda.service';

@Component({
  selector: 'app-meus-agendamentos',
  templateUrl: './meus-agendamentos.component.html',
  styleUrls: ['./meus-agendamentos.component.scss']
})
export class MeusAgendamentosComponent implements OnInit{

  constructor(
    private agendaService: AgendaService
  ){}

  ngOnInit(): void {
    this.agendaService.getTodosAgendamentos().subscribe(resp => {
      console.log(resp);
    });
  }

}
