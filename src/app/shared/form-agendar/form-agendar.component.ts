import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgendaService } from 'src/app/core/services/agenda.service';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormularioAgendamentoService } from 'src/app/core/services/formulario-agendamento.service';
import { Agendamento, Barbeiro, MensagemErro, Usuario } from 'src/app/core/types/type';

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
  horariosOcupadosNaData: Agendamento[] = [];

  novoAgendamento: Agendamento | undefined = undefined;
  usuario!: Usuario;
  mensagemErro: string = '';

  constructor(
    private agendaService: AgendaService,
    private formAgendamentoService: FormularioAgendamentoService,
    private formBuilder: FormBuilder,
    private cadastroService: CadastroService,
    private router: Router
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
    this.setValueDataForm();
    const dataBusca = `${this.formAgendamento.get('data')?.value}T03:00:00`;
    this.horariosOcupadosNaData = [];

    if (this.dataSelecionada) {
      this.agendaService.getHorariosNaData(dataBusca).subscribe(resp => {
        this.horariosOcupadosNaData = resp;
      });
    }
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
    console.log(barbeiroEscolhido);
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

  setValueDataForm(): void {
    this.formAgendamento.get('data')?.setValue(this.dataSelecionada);
  }

  agendar(): void {
    const barbeiro = this.formAgendamento.get('barbeiro')?.value;
    this.novoAgendamento = {
      idBarbeiro: barbeiro.id,
      idUsuario: this.usuario.id,
      data: `${this.formAgendamento.get('data')?.value}T${this.formAgendamento.get('horario')?.value}`
    }

    this.agendaService.agendarHorario(this.novoAgendamento).subscribe({
      next: (resp) => {
        console.log(resp);
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        const erro: MensagemErro[] = err.error;
        this.mensagemErro = `Campo ${erro[0].campo} ${erro[0].mensagem}`;
        this.temporizadorParaTirarMensagemDeErroDaTela();
      }
    });


    this.formAgendamento.reset();
    this.dataSelecionada = new Date();

  }

  temporizadorParaTirarMensagemDeErroDaTela(): void {
    setTimeout(() => {
      this.mensagemErro = '';
    }, 5000);
  }

}
