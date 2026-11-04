import { Component, ChangeDetectorRef, inject, OnInit } from '@angular/core';
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

  // '' = nenhum modal aberto | 'cadastro' | 'editar' | 'excluir'
  modal = '';

  clienteForm: Cliente = {} as Cliente;
  confirmarSenha: string = '';

  clienteSelecionado: Cliente = {} as Cliente;

  ngOnInit(): void {
    this.carregarLista();
  }

  carregarLista() {
    this.service.listar().subscribe({
      next: (clientes) => {
        this.listaClientes = clientes;
        this.cdr.detectChanges();
      },
      error: () => {
        alert('Não foi possível carregar os clientes. Confira se a API está rodando.');
      }
    });
  }

  abrirCadastro() {
    this.clienteForm = {} as Cliente;
    this.confirmarSenha = '';
    this.modal = 'cadastro';
  }

  abrirEditar(cliente: Cliente) {
    // Copia os dados para o formulário, sem mexer na lista até salvar
    this.clienteForm = new Cliente(cliente.nome, cliente.cpf, cliente.email, cliente.senha);
    this.clienteForm.id = cliente.id;
    this.confirmarSenha = cliente.senha ?? '';
    this.modal = 'editar';
  }

  abrirExcluir(cliente: Cliente) {
    this.clienteSelecionado = cliente;
    this.modal = 'excluir';
  }

  // Valida os campos antes de enviar para a API
  validarFormulario(): boolean {
    if (!this.clienteForm.nome || !this.clienteForm.cpf || !this.clienteForm.email) {
      alert('Preencha nome, CPF e email.');
      return false;
    }

    if (!this.clienteForm.senha) {
      alert('Informe uma senha.');
      return false;
    }

    if (this.clienteForm.senha !== this.confirmarSenha) {
      alert('As senhas não são iguais.');
      return false;
    }

    const cpfRepetido = this.listaClientes.some(
      cliente => cliente.cpf === this.clienteForm.cpf && cliente.id !== this.clienteForm.id
    );
    if (cpfRepetido) {
      alert('Já existe um cliente cadastrado com esse CPF.');
      return false;
    }

    return true;
  }

  salvar() {
    if (!this.validarFormulario()) {
      return;
    }

    if (this.modal === 'editar') {
      this.service.alterar(this.clienteForm).subscribe({
        next: () => {
          alert('Cliente alterado com sucesso!');
          this.carregarLista();
          this.fecharModal();
        },
        error: () => {
          alert('Não foi possível alterar o cliente.');
        }
      });
    } else {
      this.service.incluir(this.clienteForm).subscribe({
        next: (cliente) => {
          this.listaClientes.push(cliente);
          alert(`Cliente ${cliente.nome} cadastrado com sucesso!`);
          this.fecharModal();
        },
        error: () => {
          alert('Não foi possível cadastrar o cliente.');
        }
      });
    }
  }

  confirmarExclusao() {
    const id = this.clienteSelecionado.id;
    if (id !== undefined) {
      this.service.excluir(id).subscribe({
        next: () => {
          this.listaClientes = this.listaClientes.filter(cliente => cliente.id !== id);
          this.fecharModal();
        },
        error: () => {
          alert('Não foi possível excluir o cliente.');
        }
      });
    }
  }

  fecharModal() {
    this.modal = '';
    this.cdr.detectChanges();
  }
}
