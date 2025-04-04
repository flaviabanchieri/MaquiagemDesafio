import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css'],
  imports:[FormsModule, CommonModule]
})
export class PagamentoComponent implements OnInit {

  metodoPagamento: string = '';
  valorEntregue: number = 0;
  troco: number = 0;

  constructor() { }

  ngOnInit() {
  }
calcularTroco() {
    const totalCompra = 100;
    this.troco = this.valorEntregue - totalCompra;
  }

  confirmarPagamento() {
    if (!this.metodoPagamento) {
      alert('Selecione um método de pagamento!');
      return;
    }

    if (this.metodoPagamento === 'dinheiro' && this.valorEntregue < 100) {
      alert('Valor entregue insuficiente!');
      return;
    }

    alert(`Pagamento realizado com sucesso via ${this.metodoPagamento.toUpperCase()}!`);
  }
}
