import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidations } from '../form-validations';
import { FormularioService } from 'src/app/core/services/formulario.service';

@Component({
  selector: 'app-form-base',
  templateUrl: './form-base.component.html',
  styleUrls: ['./form-base.component.scss']
})
export class FormBaseComponent implements OnInit{
  cadastroForm!: FormGroup;

  @Input() perfilComponent: boolean = false;
  @Output() acaoClique: EventEmitter<any> = new EventEmitter<any>();
  @Output() deslogarUsuario: EventEmitter<any> = new EventEmitter<any>();
  @Input() titulo: string = 'Crie sua Conta';
  @Input() textoBotao: string = 'CADASTRAR';

  constructor(
    private formBuilder: FormBuilder,
    private formularioService: FormularioService
  ){}

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      nome: [null, Validators.required],
      nascimento: [null, [Validators.required]],
      telefone: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(3)]],
      confirmarEmail: [null, [Validators.required, Validators.email, FormValidations.equalTo('email')]],
      confirmarSenha: [null, [Validators.required, Validators.minLength(3), FormValidations.equalTo('senha')]],
      aceitarTermos: [null, [Validators.requiredTrue]]
    });

    if(this.perfilComponent) {
      this.cadastroForm.get('aceitarTermos')?.setValidators(null);
    } else {
      this.cadastroForm.get('aceitarTermos')?.setValidators([Validators.requiredTrue]);
    }

    this.cadastroForm.get('aceitarTermos')?.updateValueAndValidity();

    this.formularioService.setCadastro(this.cadastroForm);
  }

  executarAcao(){
    this.acaoClique.emit();
  }

  deslogar(){
    this.deslogarUsuario.emit();
  }

}
