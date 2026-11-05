import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Cliente } from '../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cadastro-cliente',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './cadastro-cliente.html',
  styleUrl: './cadastro-cliente.css'
})
export class CadastroCliente implements OnInit {

  private service = inject(ClienteService);
  private cdr = inject(ChangeDetectorRef);

  listaClientes: Cliente[] = [];

  modal: '' | 'cadastro' | 'editar' | 'excluir' = '';

  mensagem = '';

  clienteForm: Cliente = new Cliente('', '', '', '');

  confirmarSenha = '';

  clienteSelecionado: Cliente = new Cliente('', '', '');

  ngOnInit(): void {
    this.carregarLista();
  }

  carregarLista(): void {
    this.service.listar().subscribe({
      next: (clientes) => {
        this.listaClientes = clientes;
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagem = 'Não foi possível carregar os clientes. Confira se a API está rodando.';
        this.cdr.detectChanges();
      }
    });
  }

  atualizarLista(): void {
    this.carregarLista();
  }

  formatarCpf(cpf: string): string {
    const numeros = cpf.replace(/\D/g, '');

    if (numeros.length !== 11) {
      return cpf;
    }

    return numeros.substring(0, 3) + '.' +
      numeros.substring(3, 6) + '.' +
      numeros.substring(6, 9) + '-' +
      numeros.substring(9, 11);
  }

  abrirCadastro(): void {
    this.clienteForm = new Cliente('', '', '', '');
    this.confirmarSenha = '';
    this.modal = 'cadastro';
  }

  abrirEditar(cliente: Cliente): void {
    this.clienteForm = new Cliente(
      cliente.nome,
      cliente.cpf,
      cliente.email,
      ''
    );

    this.clienteForm.id = cliente.id;

    this.clienteSelecionado = cliente;
    this.confirmarSenha = '';
    this.modal = 'editar';
  }

  abrirExcluir(cliente: Cliente): void {
    this.clienteSelecionado = cliente;
    this.modal = 'excluir';
  }

  validarFormulario(): boolean {

    if (
      !this.clienteForm.nome.trim() ||
      !this.clienteForm.cpf.trim() ||
      !this.clienteForm.email.trim()
    ) {
      this.mensagem = 'Preencha todos os campos.';
      return false;
    }

    if (this.modal === 'cadastro' && !this.clienteForm.senha) {
      this.mensagem = 'Informe uma senha.';
      return false;
    }

    if (this.modal === 'editar' && this.clienteForm.senha) {
      if (this.clienteForm.senha !== this.confirmarSenha) {
        this.mensagem = 'As senhas não coincidem.';
        return false;
      }
    }

    if (this.modal === 'cadastro') {
      if (this.clienteForm.senha !== this.confirmarSenha) {
        this.mensagem = 'As senhas não coincidem.';
        return false;
      }
    }

    const cpfRepetido = this.listaClientes.some(
      cliente =>
        cliente.cpf === this.clienteForm.cpf.trim() &&
        cliente.id !== this.clienteForm.id
    );

    if (cpfRepetido) {
      this.mensagem = 'Já existe um cliente cadastrado com esse CPF.';
      return false;
    }

    return true;
  }

  salvar(): void {

    if (!this.validarFormulario()) {
      return;
    }

    const cliente = new Cliente(
      this.clienteForm.nome.trim(),
      this.clienteForm.cpf.trim(),
      this.clienteForm.email.trim(),
      this.clienteForm.senha
    );

    cliente.id = this.clienteForm.id;

    if (this.modal === 'editar') {

      if (!cliente.senha) {
        cliente.senha = this.clienteSelecionado.senha;
      }

      this.service.alterar(cliente).subscribe({
        next: () => {
          this.fecharModal();
          this.mensagem = 'Cliente alterado com sucesso!';
          this.carregarLista();
        },
        error: () => {
          this.mensagem = 'Não foi possível alterar o cliente.';
        }
      });

    } else {

      this.service.incluir(cliente).subscribe({
        next: () => {
          this.fecharModal();
          this.mensagem = 'Cliente cadastrado com sucesso!';
          this.carregarLista();
        },
        error: () => {
          this.mensagem = 'Não foi possível cadastrar o cliente.';
        }
      });

    }
  }

  confirmarExclusao(): void {

    const id = this.clienteSelecionado.id;

    if (!id) {
      return;
    }

    this.service.excluir(id).subscribe({
      next: () => {
        this.fecharModal();
        this.mensagem = 'Cliente excluído com sucesso!';
        this.carregarLista();
      },
      error: () => {
        this.mensagem = 'Não foi possível excluir o cliente.';
      }
    });

  }

  excluirCliente(): void {
    this.confirmarExclusao();
  }

  fecharModal(): void {
    this.modal = '';
    this.confirmarSenha = '';
  }

  fecharMensagem(): void {
    this.mensagem = '';
  }

}
