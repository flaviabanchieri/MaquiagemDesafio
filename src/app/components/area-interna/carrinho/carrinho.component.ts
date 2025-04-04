import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';
import { Carrinho } from '../../../core/models/carrinho';
import { Compras } from '../../../core/models/compra';
import { CompraItem } from '../../../core/models/compra-item';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CarrinhoComponent implements OnInit {
  produtos: Carrinho[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregarCarrinho();
  }

  private carregarCarrinho(): void {
    this.apiService.getItems<Carrinho[]>('carrinho').subscribe({
      next: (produtos: Carrinho[]) => {
        this.produtos = produtos;
      },
      error: () => {
        this.produtos = [];
        this.snackBar.open('Erro ao carregar o carrinho.', 'Fechar', {
          duration: 3000,
        });
      },
    });
  }

  aumentarQuantidade(produto: Carrinho): void {
    produto.quantidade++;
  }

  diminuirQuantidade(produto: Carrinho): void {
    if (produto.quantidade > 1) {
      produto.quantidade--;
    }
  }

  parsePreco(preco: string) {
    return parseFloat(preco);
  }

  removerProduto(produto: Carrinho): void {
    this.produtos = this.produtos.filter((p) => p.id !== produto.id);
    this.snackBar.open('Produto removido do carrinho.', 'Fechar', {
      duration: 2000,
    });
  }

  finalizarCompra(): void {
    var compra: Compras = new Compras();
    compra.carrinho = this.produtos;
    compra.metodoPagamento = 0;
    compra.usuarioId = 0;
    compra.comprasItens = [];
    this.apiService
      .postItems('compras', compra)
      .pipe(
        map((response: any) => {
          if (response) {
            this.router.navigate(['/pagamento', response?.comprasItens[0]?.compraId]);
            this.snackBar.open('Compra finalizada com sucesso!', 'Fechar', {
              duration: 3000,
            });
          } else {
            throw new Error('ID de compra não retornado.');
          }
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          const mensagem =
            error.error?.mensagem || 'Erro ao finalizar a compra.';
          this.snackBar.open(mensagem, 'Fechar', { duration: 3000 });
          return of(null);
        })
      )
      .subscribe();
  }

  get total(): number {
    return this.produtos.reduce(
      (total, item) => total + parseFloat(item.produto.price) * item.quantidade,
      0
    );
  }
}
