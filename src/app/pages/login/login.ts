import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  constructor(private router: Router) { };

  login: string = "";
  senha: string = "";
  botaoDesabilitado: boolean = true;
  //Valido se os campos foram preenchidos para habilitar o botão de login
  validarFormulario() {
    if (this.login.trim() !== '' && this.senha.trim() !== '') {
      this.botaoDesabilitado = false;
    } else {
      this.botaoDesabilitado = true;
    }
  }
  //Verifico se o usuário e senha são válidos
  fazerLogin() {
    if (this.login === 'adm@gmail.com' && this.senha === '123') {
      alert('Bem-vindo, administrador!');
      this.router.navigate(['/admin']);
      return;
    }

    if (this.login.trim() !== '' && this.senha.trim() !== '') {
      alert(`Bem-vindo ${this.login}!`);
      this.router.navigate(['/']);
      return;
    }

    alert('Dados inválidos');
  }
  irParaRegistro() {
    this.router.navigate(['/registro']);
  }

}
