import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthGuard } from './auth/auth.guard';
import { ListagemProdutosComponent } from './components/area-externa/listagem-produtos/listagem-produtos.component';
import { LoginComponent } from './components/area-externa/login/login.component';
import { PaginaErroComponent } from './components/area-externa/pagina-erro/pagina-erro.component';
import { CarrinhoComponent } from './components/area-interna/carrinho/carrinho.component';
import { MeusPedidosComponent } from './components/area-interna/meus-pedidos/meus-pedidos.component';
import { PagamentoComponent } from './components/area-interna/pagamento/pagamento.component';
import { CadastroComponent } from './components/area-externa/cadastro/cadastro.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'listagem', component: ListagemProdutosComponent, data: { title: 'Produtos' } },
      { path: '', redirectTo: '/listagem', pathMatch: 'full' }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent
  },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'carrinho', component: CarrinhoComponent, data: { title: 'Meu Carrinho' } },
      { path: 'pedidos', component: MeusPedidosComponent, data: { title: 'Meus Pedidos' } },
      { path: 'pagamento/:id', component: PagamentoComponent, data: { title: 'Pagamento' } }
    ]
  },

  // Página de erro
  { path: '404', component: PaginaErroComponent },
  { path: '**', redirectTo: '/404' }
];
