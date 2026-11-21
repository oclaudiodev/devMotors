import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Veiculo } from '../pages/models/veiculo.model';
import { ItemCarrinho } from '../pages/models/carrinho.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private readonly STORAGE_KEY = 'carrinho-devmotors';

  private itensSubject = new BehaviorSubject<ItemCarrinho[]>(this.carregarDoStorage());

  itens$: Observable<ItemCarrinho[]> = this.itensSubject.asObservable();

  total$: Observable<number> = this.itens$.pipe(
    map(itens => itens.reduce((acc, item) => acc + item.veiculo.valor * item.quantidade, 0))
  );

  quantidadeTotal$: Observable<number> = this.itens$.pipe(
    map(itens => itens.reduce((acc, item) => acc + item.quantidade, 0))
  );

  getItens(): ItemCarrinho[] {
    return this.itensSubject.getValue();
  }

  adicionar(veiculo: Veiculo): void {
    const itens = [...this.getItens()];
    const existente = itens.find(i => i.veiculo.id === veiculo.id);

    if (existente) {
      existente.quantidade += 1;
    } else {
      itens.push({ veiculo, quantidade: 1 });
    }

    this.atualizar(itens);
  }

  remover(veiculoId: string): void {
    const itens = this.getItens().filter(i => i.veiculo.id !== veiculoId);
    this.atualizar(itens);
  }

  alterarQuantidade(veiculoId: string, novaQuantidade: number): void {
    if (novaQuantidade <= 0) {
      this.remover(veiculoId);
      return;
    }

    const itens = this.getItens().map(i =>
      i.veiculo.id === veiculoId ? { ...i, quantidade: novaQuantidade } : i
    );
    this.atualizar(itens);
  }

  limpar(): void {
    this.atualizar([]);
  }

  private atualizar(itens: ItemCarrinho[]): void {
    this.salvarNoStorage(itens);
    this.itensSubject.next(itens);
  }

  private carregarDoStorage(): ItemCarrinho[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private salvarNoStorage(itens: ItemCarrinho[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(itens));
    } catch {
      // modo privado ou cota excedida — ignora silenciosamente
    }
  }
}