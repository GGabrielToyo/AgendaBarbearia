import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { Usuario } from 'src/app/core/types/type';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  usuario!: Usuario | null;

  constructor(
    private formularioService: FormularioService,
    private cadastroService: CadastroService,
    private router: Router
  ) { }

  cadastrar() {
    this.iniciaUsuario();

    if (this.usuario) {
      this.cadastroService.cadastrar(this.usuario).subscribe({
        next: (resp) => {
          console.log(resp);
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.log("Erro ao cadastrar usuário. ERRO -> ", err);
        }
      });
    } else {
      console.log('ERRO -> Dados formulário inválidos.');
    }
  }

  iniciaUsuario(): void {
    const formCadastro = this.formularioService.getCadastro();

    if (formCadastro?.value) {
      this.usuario = {
        id: null,
        nome: formCadastro?.value.nome,
        nascimento: formCadastro?.value.nascimento,
        telefone: formCadastro?.value.telefone,
        login: formCadastro?.value.email,
        senha: formCadastro?.value.senha,
      }
    } else {
      this.usuario = null;
    }
  }

}
