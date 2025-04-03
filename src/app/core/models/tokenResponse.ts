import { Usuario } from "./usuario";

export interface TokenResponse {
  token: string;
  usuario: Usuario;
}
