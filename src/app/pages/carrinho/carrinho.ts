import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-carrinho',
  styleUrl: './carrinho.css',
  templateUrl: './carrinho.html',
})
export class Carrinho {

  exibirModalExcluir = false;

  abrirModalExcluir() {
    this.exibirModalExcluir = true;
  }

  fecharModal() {
    this.exibirModalExcluir = false;
  }

}
