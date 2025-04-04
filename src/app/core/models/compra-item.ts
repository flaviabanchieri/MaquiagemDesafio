import { Produto } from "./produtos";
import { Compras } from "./compra";
import { Usuario } from "./usuario";

export class CompraItem {
  compraId?: number;
  produtoId!: number;
  usuarioId!: number;
  quantidade!: number;
  corEscolhidaHex: string[] = [];

  produto?: Produto;
  usuario?: Usuario;
  compra?: Compras;

}
