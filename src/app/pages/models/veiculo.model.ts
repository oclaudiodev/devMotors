export class Veiculo {
  marca: string;
  modelo: string;
  estoque: number;
  quilometragem: number;
  imagem: string;
  valor: number;
  ano: number;

  constructor(
    marca: string,
    modelo: string,
    estoque: number,
    quilometragem: number,
    imagem: string,
    valor: number,
    ano: number
  ) {
    this.marca = marca;
    this.modelo = modelo;
    this.estoque = estoque;
    this.quilometragem = quilometragem;
    this.imagem = imagem;
    this.valor = valor;
    this.ano = ano;
  }
}