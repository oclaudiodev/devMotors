import { Routes } from '@angular/router';
import { LadingPage } from './pages/lading-page/lading-page';
import { Carrinho } from './pages/carrinho/carrinho';
import { CadastroVeiculo } from './pages/cadastro-veiculo/cadastro-veiculo';

export const routes: Routes = [
  { path: '', component: LadingPage },
  { path: 'carrinho', component: Carrinho },
  { path: 'cadastro-veiculo', component: CadastroVeiculo }
];