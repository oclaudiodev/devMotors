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
  mensagemErro = '';

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
    this.mensagemErro = '';
    this.modal = 'registrar';
  }

  abrirAlterar(c: Cliente): void {
    this.cliente = { ...c };
    this.confirmaSenha = c.senha;
    this.mensagemErro = '';
    this.modal = 'alterar';
  }

  abrirExcluir(c: Cliente): void {
    this.cliente = { ...c };
    this.modal = 'excluir';
  }

  fechar(): void {
    this.modal = null;
    this.mensagemErro = '';
  }

  salvar(): void {
    const c = this.cliente;

    this.mensagemErro = '';

    if (!c.nome || !c.cpf || !c.email || !c.senha) {
      this.mensagemErro = 'Preencha todos os campos.';
      return;
    }

    if (c.senha.length < 6) {
      this.mensagemErro = 'A senha deve ter pelo menos 6 caracteres.';
      return;
    }

    if (c.senha !== this.confirmaSenha) {
      this.mensagemErro = 'As senhas não são iguais.';
      return;
    }

    const clientes = this.service.listar();

    const cpfExistente = clientes.some(cliente =>
      cliente.cpf === c.cpf && cliente.id !== c.id
    );

    if (cpfExistente) {
      this.mensagemErro = 'Este CPF já está cadastrado.';
      return;
    }

    const emailExistente = clientes.some(cliente =>
      cliente.email === c.email && cliente.id !== c.id
    );

    if (emailExistente) {
      this.mensagemErro = 'Este e-mail já está cadastrado.';
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
