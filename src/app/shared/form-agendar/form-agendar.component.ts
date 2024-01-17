import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AgendaService } from 'src/app/core/services/agenda.service';
import { BarbeiroService } from 'src/app/core/services/barbeiro.service';
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
  barbeiros: Barbeiro[] = [];

  dataSelecionada!: Date;
  horarios: string[] = [];
  horariosOcupadosNaData: Agendamento[] = [];

  novoAgendamento: Agendamento | undefined = undefined;
  usuario!: Usuario;

  constructor(
    private agendaService: AgendaService,
    private formAgendamentoService: FormularioAgendamentoService,
    private formBuilder: FormBuilder,
    private cadastroService: CadastroService,
    private barbeiroService:BarbeiroService
  ) { }

  ngOnInit(): void {
    this.formAgendamento = this.formBuilder.group({
      barbeiro: this.barbeiroControl,
      data: [null, Validators.required],
      horario: this.horarioControl
    });

    this.barbeiroService.getBarbeiros().subscribe(resp => {
      this.barbeiros = resp.content;
    });
  
    this.formAgendamentoService.setAgendamento(this.formAgendamento);

    this.cadastroService.buscarUsuario().subscribe(usuario => {
      this.usuario = usuario;
    });
  }

  buscarHorariosDisponiveisNaData() {
    this.setValueDataForm();
    this.horariosOcupadosNaData = [];

    this.agendaService.getHorariosNaData(`${this.dataSelecionada}T03:00:00`).subscribe(resp => {
      this.horariosOcupadosNaData = resp;
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

  atualizarHorariosDeAcordoComHorariosDisponiveisDoBarbeiroEscolhido(): void {
    this.preencherHorarios();
    var barbeiroEscolhido: Barbeiro = this.formAgendamento.get('barbeiro')?.value;
    
    if (!(this.horariosOcupadosNaData.length == 0) && barbeiroEscolhido.id) {
      this.horariosOcupadosNaData.forEach(horarioOcupado => {
        if (horarioOcupado.idBarbeiro == barbeiroEscolhido.id) {
          var index = this.horarios.indexOf(this.formatarData(horarioOcupado.data));
          if (index !== -1) {
            this.horarios.splice(index, 1);
          }
        }
      });
    }
  }

  recebendoBarbeiro(barbeiro: Barbeiro){
    this.barbeiroControl.setValue(barbeiro);
  }


  setValueDataForm(): void {
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

    console.log(this.novoAgendamento);

    //this.agendaService.agendarHorario(this.novoAgendamento).subscribe(resp => {
    //  this.buscarHorariosDisponiveisNaData();  
    //});

    this.formAgendamento.reset();

    this.agendaService.getTodosAgendamentos().subscribe(resp => {
      console.log(resp);
    });


  }

}
