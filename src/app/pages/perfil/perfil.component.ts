import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
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
export class PerfilComponent implements OnInit {
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
  ) { }

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
      nascimento: this.formatarDataParaInput(this.usuario.nascimento),//this.formatarDataParaInput(this.usuario.nascimento)
      telefone: this.usuario.telefone,
      email: this.usuario.login,
      confirmarEmail: this.usuario.login,
      senha: null,
      confirmarSenha: null
    });
  }

  atualizar(): void {
    const dadosAtualizados: Usuario = {
      id: this.usuario.id,
      nome: this.form?.value.nome,
      nascimento: this.formatarDataParaAtualizar(this.form?.value.nascimento),
      telefone: this.form?.value.telefone,
      login: this.form?.value.email,
      senha: this.form?.value.senha,
    }

    this.cadastroService.editarUsuario(dadosAtualizados).subscribe({
      next: (dadosAtualizados) => {
        alert("Cadastro atualizado com sucesso!");
        this.usuario = dadosAtualizados;
        this.nome = dadosAtualizados.nome;
        this.carregarForm();
      },
      error: (err) => {
        console.log("Erro ao atualizar cadastro: ", err);
      }
    });
  }

  formatarDataParaInput(dataString: string): string {
    const data = new Date(dataString);
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }

  formatarDataParaAtualizar(data : string): string {
    return `${data}T03:00:00`;
  }

  deslogar(): void {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }

}
