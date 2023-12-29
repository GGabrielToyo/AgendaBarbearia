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

  constructor(
    private formularioService: FormularioService,
    private cadastroService: CadastroService,
    private router: Router
  ){}

  cadastrar(){
    const formCadastro = this.formularioService.getCadastro();

    if(formCadastro?.value) {
      const novoUsuario: Usuario = formCadastro.getRawValue() as Usuario;
      console.log(novoUsuario);
      
      //Formatar dados do usuario de acordo com dto de usuario no back-end
      //this.cadastroService.cadastrar(novoUsuario).subscribe({
      //  next: (resp) => {
       //   console.log(resp);
      //    this.router.navigateByUrl('/');
      //  },
       // error: (err) => {
       //   console.log("Erro ao cadastrar usuário. ERRO -> ", err);
      //  }
      //}); 
    }
  }

}
