import { Component } from '@angular/core';
import { AgendaService } from 'src/app/core/services/agenda.service';

@Component({
  selector: 'app-form-agendar',
  templateUrl: './form-agendar.component.html',
  styleUrls: ['./form-agendar.component.scss']
})
export class FormAgendarComponent {
  dataSelecionada!: Date;
  horarios: string[] = ['Horário 1', 'Horário 2', 'Horário 3'];

  constructor(
    private agendaService: AgendaService
  ){}

  buscarHorariosDisponiveisNaData(){
    this.agendaService.getHorariosNaData(this.dataSelecionada).subscribe(resp => {
      console.log(resp);
    });
  }

}
