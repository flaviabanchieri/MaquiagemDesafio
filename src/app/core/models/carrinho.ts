import { Produto } from "./produtos";
import { Usuario } from "./usuario";

export class Carrinho{
  quantidade!: number;
  corEscolhidaHex: string[] = [];
  produto!: Produto;
}
