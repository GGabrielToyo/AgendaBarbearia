import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TokenService } from 'src/app/core/services/token.service';
import { Usuario } from 'src/app/core/types/type';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit{
  titulo: string = 'Olá, ';
  textoBotao: string = 'ATUALIZAR';
  perfilComponent: boolean = true;

  token: string = '';
  nome: string = '';
  usuario!: Usuario;
  form!: FormGroup<any> | null;

  constructor(
    private tokenService: TokenService,
    private cadastroService: CadastroService,
    private formService: FormularioService,
    private userService: UserService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.token = this.tokenService.retornarToken();
    this.cadastroService.buscarUsuario().subscribe(usuario => {
      this.usuario = usuario;
      this.nome = usuario.nome;
      this.carregarForm();
    });
  }

  carregarForm(): void {
    this.form = this.formService.getCadastro();
    this.form?.patchValue({
      nome: this.usuario.nome,
      nascimento: this.usuario.nascimento,
      telefone: this.usuario.telefone,
      email: this.usuario.email,
      senha: this.usuario.senha,
    });
  }

  atualizar(): void {
    const dadosAtualizados = {
      nome: this.form?.value.nome,
      nascimento: this.form?.value.nascimento,
      telefone: this.form?.value.telefone,
      email: this.form?.value.email,
      senha: this.form?.value.senha,
    }

    this.cadastroService.editarUsuario(dadosAtualizados).subscribe({
      next: () => {
        alert("Cadastro atualizado com sucesso!");
      },
      error: (err) => {
        console.log("Erro ao atualizar cadastro: ", err);
      }
    });
  }

  deslogar(): void {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }

}
