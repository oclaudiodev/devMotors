import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.html',
  styleUrl: './cadastro-cliente.css'
})
export class CadastroCliente {

  modal = '';

  abrirCadastro() {
    this.modal = 'cadastro';
  }

  abrirEditar() {
    this.modal = 'editar';
  }

  abrirExcluir() {
    this.modal = 'excluir';
  }

  fecharModal() {
    this.modal = '';
  }

}