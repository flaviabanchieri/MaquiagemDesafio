import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Compras } from '../../../core/models/compra';
import { ApiService } from '../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.css'],
  imports: [CommonModule],
})
export class MeusPedidosComponent implements OnInit {
  compras: Compras[] = [];
  constructor(private router: Router, private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.obterCompras();
  }

  obterMetodoPagamento(metodo: number): string {
    const metodos: { [key: number]: string } = {
      0: 'Aguardando Pagamento',
      1: 'Dinheiro',
      2: 'Pix',
    };

    return metodos[metodo] || 'Desconhecido';
  }

  obterCompras() {
    this.apiService.getItems<Compras[]>('compras').subscribe({
      next: (produtos: Compras[]) => {
        this.compras = produtos;
        console.log(produtos)
      },
      error: () => {
        this.compras = [];
        this.snackBar.open('Erro ao carregar os pedidos.', 'Fechar', {
          duration: 3000,
        });
      },
    });
  }

  irParaPagamento(compra: Compras){
    if(compra.metodoPagamento == 0){
      this.router.navigate([
        '/pagamento',
        compra.comprasItens[0].compraId,
      ]);
    }
  }

  calcularTotal(compra: Compras): number {
    return compra.comprasItens.reduce((total, item) => {
      return (
        total +
        (item.produto?.price
          ? parseFloat(item.produto.price) * item.quantidade
          : 0)
      );
    }, 0);
  }
}
