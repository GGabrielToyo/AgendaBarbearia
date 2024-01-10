import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AgendaService } from 'src/app/core/services/agenda.service';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormularioAgendamentoService } from 'src/app/core/services/formulario-agendamento.service';
import { UserService } from 'src/app/core/services/user.service';
import { Agendamento, Barbeiro, Usuario } from 'src/app/core/types/type';

@Component({
  selector: 'app-form-agendar',
  templateUrl: './form-agendar.component.html',
  styleUrls: ['./form-agendar.component.scss']
})
export class FormAgendarComponent implements OnInit {
  formAgendamento!: FormGroup;
  barbeiroControl = new FormControl<Barbeiro | null>(null, Validators.required);
  horarioControl = new FormControl<String[] | null>(null, Validators.required);

  dataSelecionada!: Date;
  horarios: string[] = [];
  horariosOcupadosNaData: string[] = [];

  novoAgendamento: Agendamento | undefined = undefined;
  usuario!: Usuario;

  constructor(
    private agendaService: AgendaService,
    private formAgendamentoService: FormularioAgendamentoService,
    private formBuilder: FormBuilder,
    private cadastroService: CadastroService
  ) { }

  ngOnInit(): void {
    this.formAgendamento = this.formBuilder.group({
      barbeiro: this.barbeiroControl,
      data: [null, Validators.required],
      horario: this.horarioControl
    });

    this.formAgendamentoService.setAgendamento(this.formAgendamento);

    this.cadastroService.buscarUsuario().subscribe(usuario => {
      this.usuario = usuario;
    });
  }

  buscarHorariosDisponiveisNaData() {
    this.preencherHorarios()
    this.setValueForm();
    this.horariosOcupadosNaData = [];

    this.agendaService.getHorariosNaData(this.dataSelecionada).subscribe(resp => {
      resp.forEach(agendamento => {
        this.horariosOcupadosNaData.push(this.formatarData(agendamento.data));
      });
      this.atualizarHorariosDeAcordoComHorariosOcupados();
    });
  }

  preencherHorarios(): void {
    this.horarios = [
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00'
    ];
  }

  formatarData(dataString: string): string {
    const data = new Date(dataString);
    const hora = this.adicionarZeroAEsquerda(data.getHours());
    const minutos = this.adicionarZeroAEsquerda(data.getMinutes());

    return `${hora}:${minutos}`;
  }

  adicionarZeroAEsquerda(numero: number): string {
    return numero < 10 ? `0${numero}` : `${numero}`;
  }

  atualizarHorariosDeAcordoComHorariosOcupados(): void {
    this.horariosOcupadosNaData.forEach(horarioOcupado => {
      const index = this.horarios.indexOf(horarioOcupado);

      if (index !== -1) {
        this.horarios.splice(index, 1);
      }
    });
  }

  setValueForm(): void {
    this.formAgendamento.get('data')?.setValue(this.dataSelecionada);
  }

  formatarDataParaAgendamento(): string {
    const data = this.dataSelecionada.toISOString().substring(0, 10);
    const hora = this.formAgendamento.get('horario')?.value;
    return `${data}T${hora}`;
  }

  agendar(): void {
    const barbeiro = this.formAgendamento.get('barbeiro')?.value;

    this.novoAgendamento = {
      idBarbeiro: barbeiro.id,
      idUsuario: this.usuario.id,
      data: this.formatarDataParaAgendamento()
    }

    this.agendaService.agendarHorario(this.novoAgendamento).subscribe(resp => {
      console.log(resp);
    });
    
  }

}
