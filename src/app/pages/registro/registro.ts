import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
  imports: [FormsModule],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})
export class Registro {

  private router = inject(Router);
  private service = inject(ClienteService);

  cliente: Cliente = {} as Cliente;
  confirmarSenha: string = '';

  cadastrar() {
    if (!this.cliente.nome || !this.cliente.cpf || !this.cliente.email || !this.cliente.senha) {
      alert('Preencha nome, CPF, email e senha.');
      return;
    }

    if (this.cliente.senha !== this.confirmarSenha) {
      alert('As senhas não são iguais.');
      return;
    }

    this.service.incluir(this.cliente).subscribe({
      next: (clienteCriado) => {
        alert(`Cadastro realizado com sucesso! Bem-vindo, ${clienteCriado.nome}.`);
        this.router.navigate(['/login']);
      },
      error: () => alert('Não foi possível concluir o cadastro. Confira se a API está rodando.')
    });
  }

  voltarParaLogin() {
    this.router.navigate(['/login']);
  }
}