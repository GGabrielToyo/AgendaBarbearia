import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user$ = this.userService.retornarUser();
  nomeUsuario: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private cadastroService: CadastroService
  ) { }

  ngOnInit(): void {
    this.cadastroService.buscarUsuario().subscribe(user => {
      this.nomeUsuario = user.nome;
    })
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }

}
