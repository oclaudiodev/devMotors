import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CarrinhoService } from '../../services/carrinho.service';  
import { ItemCarrinho } from '../models/carrinho.model';


@Component({
  imports: [AsyncPipe],
  selector: 'app-carrinho',
  styleUrl: './carrinho.css',
  templateUrl: './carrinho.html',
})
export class Carrinho {

  private carrinhoService = inject(CarrinhoService);

  itens$ = this.carrinhoService.itens$;
  total$ = this.carrinhoService.total$;

  exibirModalExcluir = false;
  itemSelecionado: ItemCarrinho | null = null;

  abrirModalExcluir(item: ItemCarrinho) {
    this.itemSelecionado = item;
    this.exibirModalExcluir = true;
  }

  confirmarExclusao() {
    if (this.itemSelecionado?.veiculo.id) {
      this.carrinhoService.remover(this.itemSelecionado.veiculo.id);
    }
    this.fecharModal();
  }

  fecharModal() {
    this.exibirModalExcluir = false;
    this.itemSelecionado = null;
  }

  aumentarQuantidade(item: ItemCarrinho) {
    if (item.veiculo.id) {
      this.carrinhoService.alterarQuantidade(item.veiculo.id, item.quantidade + 1);
    }
  }

  diminuirQuantidade(item: ItemCarrinho) {
    if (item.veiculo.id) {
      this.carrinhoService.alterarQuantidade(item.veiculo.id, item.quantidade - 1);
    }
  }

  comprar() {
    const itens = this.carrinhoService.getItens();
    if (itens.length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }
    alert('Compra realizada com sucesso! Obrigado por escolher a DEV MOTORS.');
    this.carrinhoService.limpar();
  }

  formatarPreco(valor: number): string {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}