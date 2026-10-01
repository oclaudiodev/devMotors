import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { Cliente } from '../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
  imports: [FormsModule],
  selector: 'app-cadastro-cliente',
  styleUrl: './cadastro-cliente.css',
  templateUrl: './cadastro-cliente.html',
})
export class CadastroCliente {

  private service = inject(ClienteService);

  clientes: Cliente[] = [];

  // Qual janela está aberta. null = nenhuma
  modal: 'registrar' | 'alterar' | 'excluir' | null = null;

  cliente: Cliente = {
    id: 0,
    nome: '',
    cpf: '',
    email: '',
    senha: ''
  };

  confirmaSenha = '';

  constructor() {
    this.carregar();
  }

  clienteVazio(): Cliente {
    return {
      id: 0,
      nome: '',
      cpf: '',
      email: '',
      senha: ''
    };
  }

  // CONSULTA
  carregar(): void {
    this.clientes = this.service.listar();
  }

  // ----- abrir e fechar janelas -----
  abrirRegistrar(): void {
    this.cliente = this.clienteVazio();
    this.confirmaSenha = '';
    this.modal = 'registrar';
  }

  abrirAlterar(c: Cliente): void {
    this.cliente = { ...c };
    this.confirmaSenha = c.senha;
    this.modal = 'alterar';
  }

  abrirExcluir(c: Cliente): void {
    this.cliente = { ...c };
    this.modal = 'excluir';
  }

  fechar(): void {
    this.modal = null;
  }

  // INCLUSÃO e ALTERAÇÃO
  salvar(): void {
    const c = this.cliente;

    if (!c.nome || !c.cpf || !c.email || !c.senha) {
      alert('Preencha todos os campos.');
      return;
    }

    if (c.senha !== this.confirmaSenha) {
      alert('As senhas não são iguais.');
      return;
    }

    if (this.modal === 'registrar') {
      this.service.incluir(c);
    } else {
      this.service.alterar(c);
    }

    this.fechar();
    this.carregar();
  }

  // EXCLUSÃO
  confirmarExclusao(): void {
    this.service.excluir(this.cliente.id);
    this.fechar();
    this.carregar();
  }
}
