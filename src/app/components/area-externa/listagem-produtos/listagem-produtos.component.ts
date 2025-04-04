import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Produto } from '../../../core/models/produtos';
import { UrlProdutos } from '../../../core/url/produtos-url';
import { StringHelper } from '../../../helpers/string-helper';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../auth/auth.service';
import { AdicionarCarrinhoDialogComponent } from '../../area-interna/adicionar-carrinho-dialog/adicionar-carrinho-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-listagem-produtos',
  templateUrl: './listagem-produtos.component.html',
  styleUrls: ['./listagem-produtos.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    SpinnerComponent,
    MatDialogModule,
    NgxSliderModule,
  ],
})
export class ListagemProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  marcas: string[] = [];
  categorias: { key: string; value: string }[] = [];
  tags: { key: string; value: string }[] = [];
  carregando = false;
  filtersForm!: FormGroup;
  nenhumResultado: boolean = false;
  min: number = 0;
  max: number = 70;

  minPrice: number = 0;
  maxPrice: number = 70;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private ApiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.construirFormulario();
    this.popularCampos();
  }

  onSubmit() {
    this.obterProdutos();
  }

  estaAutenticado() {
    return this.authService.isAuthenticated();
  }

  construirFormulario() {
    this.filtersForm = this.fb.group({
      brand: this.fb.control(''),
      priceGreaterThan: this.fb.control(''),
      priceLessThan: this.fb.control(''),
      productCategory: this.fb.control(''),
      productTags: this.fb.control([]),
    });
  }

  popularCampos() {
    this.obterTags();
    this.obterCategorias();
    this.obterMarcas();
    this.obterProdutos();
  }

  obterTags() {
    this.ApiService.getTags().subscribe({
      next: (tags) => {
        this.tags = Object.keys(tags).map((key) => ({
          key: key,
          value: tags[key],
        }));
      },
      error: (err) => {
        console.error('Erro ao carregar tags:', err);
        this.tags = [];
      },
    });
  }

  obterMarcas() {
    this.ApiService.getMarcas().subscribe({
      next: (marcas) => {
        this.marcas = marcas.map((brand) =>
          StringHelper.capitalizeFirstLetters(brand)
        );
      },
      error: (err) => {
        this.marcas = [];
      },
    });
  }

  obterCategorias() {
    this.ApiService.getCategorias().subscribe({
      next: (categorias) => {
        this.categorias = Object.keys(categorias).map((key) => ({
          key: key,
          value: categorias[key],
        }));
      },
      error: (err) => {
        console.error('Erro ao carregar tags:', err);
        this.categorias = [];
      },
    });
  }

  obterProdutos() {
    var filtros = this.filtersForm.value;
    filtros.priceGreaterThan = filtros.priceGreaterThan
      ? Math.ceil(filtros.priceGreaterThan)
      : null;
    filtros.priceLessThan = filtros.priceLessThan
      ? Math.ceil(filtros.priceLessThan)
      : null;

    if (filtros.priceLessThan > 0 && filtros.priceGreaterThan > 0) {
      this.filtersForm.patchValue({
        priceLessThan: filtros.priceLessThan,
        priceGreaterThan: filtros.priceGreaterThan,
      });
    }
    this.carregando = true;
    if ((this.nenhumResultado = true)) this.nenhumResultado = false;
    this.ApiService.getFiltro<Produto[]>(
      UrlProdutos.ObterTodos,
      filtros
    ).subscribe({
      next: (products: Produto[]) => {
        this.produtos = products;
        this.carregando = false;
        console.log(products);
        if (this.produtos.length <= 0) {
          this.nenhumResultado = true;
        }
      },
      error: (err) => {
        this.produtos = [];
        this.carregando = false;
      },
    });
  }

  adicionarAoCarrinho(produto: Produto) {
    if (this.estaAutenticado()) {
      this.abrirPopupProduto(produto);
    } else {
      this.router.navigate(['/login']);
    }
  }

  resetarFiltros(): void {
    this.filtersForm.reset();
    this.filtersForm.markAsPristine();
    this.filtersForm.markAsUntouched();
    this.obterProdutos();
  }

  abrirPopupProduto(produto: Produto) {
    const dialogRef = this.dialog.open(AdicionarCarrinhoDialogComponent, {
      height: '85vh',
      data: produto,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.estaAutenticado();
      if (!this.estaAutenticado()) {
        this.snackBar.open('Precisa fazer login novamente');
      }
    });
  }

  get rangeStyle() {
    const minPercent = ((this.minPrice - this.min) / (this.max - this.min)) * 100;
    const maxPercent = ((this.maxPrice - this.min) / (this.max - this.min)) * 100;
    return {
      left: `${minPercent}%`,
      width: `${maxPercent - minPercent}%`
    };
  }

  validateMin() {
    if (this.minPrice > this.maxPrice) {
      this.minPrice = this.maxPrice;
    }
    this.onSliderChange()
  }

  validateMax() {
    if (this.maxPrice < this.minPrice) {
      this.maxPrice = this.minPrice;
    }
    this.onSliderChange()
  }

  onSliderChange() {
    this.filtersForm.patchValue({
      priceGreaterThan: this.minPrice,
      priceLessThan: this.maxPrice
    });
  }

}
