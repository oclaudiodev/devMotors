import { Injectable } from '@angular/core';
import type { Cliente } from '../pages/models/cliente.model';

// Guarda os dados em memória e faz o CRUD (sem banco de dados)
@Injectable({ providedIn: 'root' })
export class ClienteService {
  private clientes: Cliente[] = [
    { id: 1, nome: 'Nilton', cpf: '001', email: 'nilton@email.com', senha: '123' },
    { id: 2, nome: 'Naldo',  cpf: '002', email: 'naldo@email.com',  senha: '123' },
    { id: 3, nome: 'Noia',   cpf: '003', email: 'noia@email.com',   senha: '123' },
  ];
  private proximoId = 4;

  listar(): Cliente[] {                 // CONSULTA
    return [...this.clientes];
  }

  incluir(cliente: Cliente): void {     // INCLUSÃO
    this.clientes.push({ ...cliente, id: this.proximoId++ });
  }

  alterar(cliente: Cliente): void {     // ALTERAÇÃO
    const i = this.clientes.findIndex(c => c.id === cliente.id);
    if (i !== -1) this.clientes[i] = { ...cliente };
  }

  excluir(id: number): void {           // EXCLUSÃO
    this.clientes = this.clientes.filter(c => c.id !== id);
  }
}