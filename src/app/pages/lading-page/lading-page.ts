
import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Veiculo } from '../models/veiculo.model';
import { VeiculoService } from '../../services/veiculo.service';

@Component({
  imports: [RouterLink],
  selector: 'app-lading-page',
  styleUrl: './lading-page.css',
  templateUrl: './lading-page.html',
})
export class LadingPage implements OnInit {

  private service = inject(VeiculoService);
  private cdr = inject(ChangeDetectorRef);

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

  abrirModal() {
    this.exibirModal = true;
  }

  fecharModal() {
    this.exibirModal = false;
  }
}
