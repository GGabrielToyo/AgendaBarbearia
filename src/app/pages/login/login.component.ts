import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';
import { DadosAutenticacao } from 'src/app/core/types/type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  dadosAutenticacao!: DadosAutenticacao;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: AutenticacaoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required]
    });
  }

  login(): void {
    this.dadosAutenticacao = {
      login: this.loginForm.value.email,
      senha: this.loginForm.value.senha
    }

    this.loginService.autenticar(this.dadosAutenticacao).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
        this.loginForm.reset();
      },
      error: (err) => {
        console.log("Erro no login: ", err.error);
      }
    });
  }

}
