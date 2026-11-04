import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from '../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
  imports: [FormsModule],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})
export class Registro {
  private service = inject(ClienteService);
  private router = inject(Router);

  cliente: Cliente = {} as Cliente;
  confirmarSenha: string = '';

  cadastrar() {
    if (!this.cliente.nome || !this.cliente.cpf || !this.cliente.email || !this.cliente.senha) {
      alert('Preencha todos os campos.');
      return;
    }

    if (this.cliente.senha !== this.confirmarSenha) {
      alert('As senhas não são iguais.');
      return;
    }

    this.service.incluir(this.cliente).subscribe({
      next: (cliente) => {
        alert(`Cliente ${cliente.nome} cadastrado com sucesso!`);
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Não foi possível concluir o cadastro. Confira se a API está rodando.');
      }
    });
  }

  voltarParaLogin() {
    this.router.navigate(['/login']);
  }
}
