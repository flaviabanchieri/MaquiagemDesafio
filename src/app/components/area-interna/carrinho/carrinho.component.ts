import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../../../core/models/produtos';
import { ApiService } from '../../../core/services/api.service';
import { Carrinho } from '../../../core/models/carrinho';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
  imports: [CommonModule],
})
export class CarrinhoComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.obterCarrinho();
  }
  produtos: Carrinho[] = [];

  obterCarrinho() {
    this.apiService.getItems<Carrinho[]>('carrinho')
    .subscribe({
      next: (products: Carrinho[]) => {
        this.produtos = products;
        console.log(this.produtos)
      },
      error: (err) => {
        this.produtos = [];
      },
    });
  }
  aumentar(produto: Carrinho) {
    produto.quantidade++;
  }

  parsePreco(preco: string) {
    return parseFloat(preco);
  }

  diminuir(produto: Carrinho) {
    if (produto.quantidade > 1) produto.quantidade--;
  }

  remover(produto: Carrinho) {
    this.produtos = this.produtos.filter((p) => p.id !== produto.id);
  }

  get total(): number {
    return this.produtos.reduce(
      (acc, p) => acc + parseFloat(p.produto.price) * p.quantidade,
      0
    );
  }
}
