import { Component, Inject, Input, OnInit } from '@angular/core';
import { Produto } from '../../../core/models/produtos';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../core/services/api.service';
import { Carrinho } from '../../../core/models/carrinho';
import { catchError, map, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ListagemProdutosComponent } from '../../area-externa/listagem-produtos/listagem-produtos.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adicionar-carrinho-dialog',
  templateUrl: './adicionar-carrinho-dialog.component.html',
  styleUrls: ['./adicionar-carrinho-dialog.component.css'],
  imports: [CommonModule]
})
export class AdicionarCarrinhoDialogComponent implements OnInit {

  coresSelecionadasHex: string[] = [];
  quantidade = 1;

  constructor( private dialogRef: MatDialogRef<AdicionarCarrinhoDialogComponent>, @Inject(MAT_DIALOG_DATA) public produto: Produto, private apiService: ApiService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  corSelecionada(hex: string): string {
    const index = this.coresSelecionadasHex.indexOf(hex);
    if (index !== -1) {
      return 'selecionado'
    } else {
      return '';
    }
  }

  selecionarCor(hex: string) {
    if(this.coresSelecionadasHex.length == this.quantidade){
      this.snackBar.open('Quantidade atingida', 'Fechar', {
        duration: 3000
      });
      return
    }
    const index = this.coresSelecionadasHex.indexOf(hex);
    if (index !== -1) {
      this.coresSelecionadasHex.splice(index, 1);
    } else {
      this.coresSelecionadasHex.push(hex);
    }

    console.log(this.coresSelecionadasHex)
  }

  alterarQuantidade(event: Event){
    const inputElement = event.target as HTMLInputElement;
  const novaQuantidade = parseInt(inputElement.value, 10);

  if (!isNaN(novaQuantidade) && novaQuantidade >= 1) {
    this.quantidade = novaQuantidade;
  } else {
    this.quantidade = 1;
  }
  }

  validarProduto(){
    this.produto.category == null ? 0 : this.produto.category;

  }

  adicionar(){

    this.validarProduto()
    var carrinho: Carrinho = new Carrinho();
    carrinho.corEscolhidaHex = [];
    carrinho.corEscolhidaHex.push(...this.coresSelecionadasHex)
    carrinho.produto = this.produto;
    carrinho.produto.rating = 0;
    carrinho.quantidade = this.quantidade;
    this.apiService.postItems('carrinho', carrinho).pipe(
      map((response: any) => {
        this.snackBar.open('Produto criado com sucesso!', 'Fechar', {
          duration: 3000
        });
        this.dialogRef.close();
        return { status: 200, mensagem: 'Adicionado no carrinho' };
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Erro na requisição:', error);
        return of({ status: error.status, mensagem: error.error?.mensagem || 'Erro desconhecido' });
      })
    ).subscribe();
  }

}
