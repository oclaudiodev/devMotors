import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro-cliente', 
  standalone: true, 
  imports: [RouterLink], 
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