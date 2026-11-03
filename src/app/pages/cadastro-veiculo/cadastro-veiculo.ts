import { Component, ChangeDetectorRef, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Veiculo } from '../models/veiculo.model';
import { VeiculoService } from '../../services/veiculo.service';

@Component({
  selector: 'app-cadastro-veiculo',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './cadastro-veiculo.html',
  styleUrl: './cadastro-veiculo.css'
})
export class CadastroVeiculo implements OnInit {
  private service = inject(VeiculoService);
  private cdr = inject(ChangeDetectorRef);

  listaVeiculos: Veiculo[] = [];

  exibirFormulario: boolean = false;
  exibirModalExcluir: boolean = false;
  modoEdicao: boolean = false;

  veiculoForm: Veiculo = {} as Veiculo;

  carroSelecionado: Veiculo = {} as Veiculo;

  ngOnInit(): void {
    this.carregarLista();
  }

  carregarLista() {
    this.service.listar().subscribe({
      next: (veiculos) => {
        this.listaVeiculos = veiculos;
      },
      error: () => {
        alert('Não foi possível carregar os veículos. Confira se a API está rodando.');
      }
    });
  }

  abrirFormularioRegistro() {
    this.modoEdicao = false;
    this.veiculoForm = {} as Veiculo;
    this.exibirFormulario = true;
  }

  abrirFormularioEditar(carro: Veiculo) {
    this.modoEdicao = true;
    this.veiculoForm = new Veiculo(
      carro.marca,
      carro.modelo,
      carro.estoque,
      carro.quilometragem,
      carro.imagem,
      carro.valor,
      carro.ano
    );
    this.veiculoForm.id = carro.id;
    this.exibirFormulario = true;
  }

  salvar() {
    if (
      !this.veiculoForm.marca ||
      !this.veiculoForm.modelo ||
      !this.veiculoForm.ano ||
      !this.veiculoForm.valor
    ) {
      alert('Preencha marca, modelo, ano e preço.');
      return;
    }

    if (this.modoEdicao) {
      this.service.alterar(this.veiculoForm).subscribe({
        next: () => {
          alert('Veículo alterado com sucesso!');
          this.carregarLista();
          this.fecharModal();
        },
        error: () => {
          alert('Não foi possível alterar o veículo.');
        }
      });
    } else {
      this.service.incluir(this.veiculoForm).subscribe({
        next: (veiculo) => {
          this.listaVeiculos.push(veiculo);
          alert('Veículo registrado com sucesso!');
          this.fecharModal();
        },
        error: () => {
          alert('Não foi possível registrar o veículo.');
        }
      });
    }
  }

  abrirModalExcluir(carro: Veiculo) {
    this.carroSelecionado = carro;
    this.exibirModalExcluir = true;
  }

  confirmarExclusao() {
    const id = this.carroSelecionado.id;
    if (id !== undefined) {
      this.service.excluir(id).subscribe({
        next: () => {
          this.listaVeiculos = this.listaVeiculos.filter(carro => carro.id !== id);
          this.fecharModal();
        },
        error: () => {
          alert('Não foi possível excluir o veículo.');
        }
      });
    }
  }

  fecharModal() {
    this.exibirFormulario = false;
    this.exibirModalExcluir = false;
    this.cdr.detectChanges();
  }
}