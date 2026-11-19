import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  listaClientes: Cliente[] = [];

  modal: '' | 'cadastro' | 'editar' | 'excluir' = '';

  clienteForm: Cliente = {} as Cliente;
  confirmarSenha: string = '';

  clienteSelecionado: Cliente = {} as Cliente;

  clienteId: string | null = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.carregarLista();

    if (this.clienteId) {
      this.service.buscarPorId(this.clienteId).subscribe({
        next: (cliente) => {
          this.clienteForm = { ...cliente };
          this.modal = 'editar';
        },
        error: () => alert('Cliente não encontrado.')
      });
    }
  }

  carregarLista(): void {
    this.service.listar().subscribe({
      next: (clientes) => {
        this.listaClientes = clientes;
      },
      error: () => {
        alert('Não foi possível carregar os clientes. Confira se a API está rodando.');
      }
    });
  }

  abrirCadastro(): void {
    this.clienteForm = {} as Cliente;
    this.confirmarSenha = '';
    this.modal = 'cadastro';
  }

  abrirEditar(cliente: Cliente): void {
    this.clienteForm = { ...cliente };
    this.confirmarSenha = '';
    this.modal = 'editar';
  }

  abrirExcluir(cliente: Cliente): void {
    this.clienteSelecionado = cliente;
    this.modal = 'excluir';
  }

  fecharModal(): void {
    this.modal = '';
  }

  salvar(): void {
    if (!this.clienteForm.nome || !this.clienteForm.cpf || !this.clienteForm.email) {
      alert('Preencha nome, CPF e email.');
      return;
    }

    if (this.clienteForm.senha && this.clienteForm.senha !== this.confirmarSenha) {
      alert('As senhas não são iguais.');
      return;
    }

    if (this.clienteForm.id) {
      this.service.editar(this.clienteForm).subscribe({
        next: () => {
          alert(`Cliente ${this.clienteForm.nome} alterado com sucesso!`);
          this.carregarLista();
          this.fecharModal();
          if (this.clienteId) {
            this.router.navigate(['/cadastro-cliente']);
          }
        },
        error: () => alert('Erro ao alterar o cliente.')
      });
    } else {
      this.service.incluir(this.clienteForm).subscribe({
        next: (cliente) => {
          alert(`Cliente ${cliente.nome} cadastrado com sucesso!`);
          this.carregarLista();
          this.fecharModal();
        },
        error: () => alert('Erro ao cadastrar o cliente.')
      });
    }
  }

  confirmarExclusao(): void {
    const id = this.clienteSelecionado.id;
    if (!id) {
      this.fecharModal();
      return;
    }

    this.service.excluir(id).subscribe({
      next: () => {
        this.listaClientes = this.listaClientes.filter(c => c.id !== id);
        this.fecharModal();
      },
      error: () => alert('Não foi possível excluir o cliente.')
    });
  }
}