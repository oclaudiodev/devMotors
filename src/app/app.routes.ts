import { Routes } from '@angular/router';
import { LadingPage } from './pages/lading-page/lading-page';
import { Carrinho } from './pages/carrinho/carrinho';
import { CadastroVeiculo } from './pages/cadastro-veiculo/cadastro-veiculo';
import { Login } from './pages/login/login';
import  {Registro} from './pages/registro/registro';


export const routes: Routes = [
  { path: '', component: LadingPage },
  { path: 'carrinho', component: Carrinho },
  { path: 'login', component: Login },
  { path: 'cadastro-veiculo', component: CadastroVeiculo },
  { path: 'registro', component: Registro },
  { path: 'admin', component: PgAdmin }
];


