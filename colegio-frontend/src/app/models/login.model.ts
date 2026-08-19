export interface LoginRequest {
  username: string;
  password: string;
}
export interface LoginResponse {
  idUsuario: number;
  username: string;
  rol: string;
  mensaje: string;
}
