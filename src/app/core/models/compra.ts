import { Carrinho } from './carrinho';
import { CompraItem } from './compra-item';


export class Compras {
  usuarioId!: number;
  metodoPagamento!: number;
  valorTotal!: number;
  dataCriacao!: Date;
  comprasItens: CompraItem[] = [];
  carrinho: Carrinho[] = [];
}
