import { Component } from '@angular/core';

// 1. Classe de Modelo representando a entidade Veículo
export class Veiculo {
  marca: string;
  modelo: string;
  estoque: number;
  quilometragem: number;
  imagem: string;

  constructor(
    marca: string,
    modelo: string,
    estoque: number,
    quilometragem: number,
    imagem: string
  ) {
    this.marca = marca;
    this.modelo = modelo;
    this.estoque = estoque;
    this.quilometragem = quilometragem;
    this.imagem = imagem;
  }
}

@Component({
  selector: 'app-cadastro-veiculo',
  standalone: true,
  imports: [],
  templateUrl: './cadastro-veiculo.html',
  styleUrl: './cadastro-veiculo.css'
})
export class CadastroVeiculo {
  // 2. Vetor de objetos (Instâncias da classe Veiculo)
  listaVeiculos: Veiculo[] = [
    new Veiculo(
      'BYD',
      'King',
      1,
      0,
      'https://gabcomercio.azureedge.net/godrive/blog/byd-king-ficha-tecnica/main_image.webp'
    ),
    new Veiculo(
      'Toyota',
      'Corolla Cross',
      1,
      15000,
      'https://cdn.motor1.com/images/mgl/ljVZ1/s1/2022-toyota-corolla-cross-us-spec.jpg'
    ),
    new Veiculo(
      'Jeep',
      'Renegade',
      1,
      32000,
      'https://www.jeep.com.br/content/dam/jeep/open-graph/open-graph-renegade.webp'
    )
  ];
}