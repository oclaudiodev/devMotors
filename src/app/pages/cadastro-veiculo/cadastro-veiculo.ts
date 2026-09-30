import { Component } from '@angular/core';
import { Veiculo } from '../models/veiculo.model';

@Component({
  selector: 'app-cadastro-veiculo',
  standalone: true,
  imports: [],
  templateUrl: './cadastro-veiculo.html',
  styleUrl: './cadastro-veiculo.css'
})
export class CadastroVeiculo {
  listaVeiculos: Veiculo[] = [
    new Veiculo('BYD', 'King', 1, 0, 'images/byd-king.png', 175000, 2025),
    new Veiculo('Toyota', 'Corolla Cross', 1, 15000, 'images/corolla-cross.png', 160000, 2022),
    new Veiculo('Jeep', 'Renegade', 1, 32000, 'images/jeep-renegade.png', 115000, 2021)
  ];

  exibirFormulario: boolean = false;
  exibirModalExcluir: boolean = false;
  modoEdicao: boolean = false;

  carroEmEdicao: Veiculo = new Veiculo('', '', 0, 0, '', 0, 0);

  abrirFormularioRegistro() {
    this.modoEdicao = false;
    this.exibirFormulario = true;
  }

  abrirFormularioEditar(carro: Veiculo) {
    this.modoEdicao = true;
    this.carroEmEdicao = carro;
    this.exibirFormulario = true;
  }

  abrirModalExcluir() {
    this.exibirModalExcluir = true;
  }

  fecharModal() {
    this.exibirFormulario = false;
    this.exibirModalExcluir = false;
  }
}