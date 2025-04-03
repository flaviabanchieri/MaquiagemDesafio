import { Produto } from "./produtos";
import { Usuario } from "./usuario";

export class Carrinho{
  id!: number;
  quantidade!: number;
  corEscolhidaHex: string[] = [];
  produto!: Produto;
}
