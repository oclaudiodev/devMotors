import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Veiculo } from '../models/veiculo.model';
import { VeiculoService } from '../../services/veiculo.service';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  imports: [RouterLink],
  selector: 'app-lading-page',
  styleUrl: './lading-page.css',
  templateUrl: './lading-page.html',
})
export class LadingPage implements OnInit {

  private service = inject(VeiculoService);
  private cdr = inject(ChangeDetectorRef);
  private carrinhoService = inject(CarrinhoService);
  private router = inject(Router);

  carros: Veiculo[] = [];
  exibirModal: boolean = false;

  ngOnInit(): void {
    this.carregarVeiculos();
  }

  carregarVeiculos() {
    this.service.listar().subscribe({
      next: (veiculos) => {
        this.carros = veiculos;
        this.cdr.detectChanges();
      },
      error: () => {
        alert('Não foi possível carregar os veículos. Confira se a API está rodando.');
      }
    });
  }

  adicionarAoCarrinho(veiculo: Veiculo) {
    this.carrinhoService.adicionar(veiculo);
    alert(`${veiculo.marca} ${veiculo.modelo} adicionado ao carrinho!`);
  }

  comprarAgora(veiculo: Veiculo) {
    this.carrinhoService.adicionar(veiculo);
    this.router.navigate(['/carrinho']);
  }

  abrirModal() {
    this.exibirModal = true;
  }

  fecharModal() {
    this.exibirModal = false;
  }
}