import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
} from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Compras } from '../../../core/models/compra';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css'],
  imports: [CommonModule, FormsModule],
})
export class PagamentoComponent implements OnInit {
  metodoPagamento: number = 0;
  valorEntregue: number = 0;
  troco: number = 0;
  id!: number;
  compra!: Compras;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = +idParam;
        this.obterCompra();
      }
    });
  }

  calcularTroco() {
    if (this.compra?.valorTotal != null) {
      this.troco = this.valorEntregue - this.compra.valorTotal;
    }
  }

  obterCompra() {
    this.apiService
      .getItems<Compras>('compras/ObterParaPagamento/' + this.id)
      .subscribe({
        next: (compra: Compras) => {
          console.log(compra)
          this.compra = compra;
        },
        error: () => {
          alert('Erro ao carregar a compra.');
        },
      });
  }

  confirmarPagamento() {
    if (!this.metodoPagamento) {
      alert('Selecione um método de pagamento!');
      return;
    }

    this.apiService.patchItem(`compras/${this.id}`, {
      metodoPagamento: this.metodoPagamento,
    }).subscribe({
      next: () => {
        alert(`Pagamento realizado com sucesso`);
        this.router.navigate(['/pedidos']);
      },
      error: () => {
        alert('Erro ao confirmar pagamento.');
      },
    });
  }
}
