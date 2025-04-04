import { Carrinho } from './carrinho';
import { CompraItem } from './compra-item';


export class Compras {
  usuarioId!: number;
  metodoPagamento!: number;
  comprasItens: CompraItem[] = [];
  carrinho: Carrinho[] = [];
}
